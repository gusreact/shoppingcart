import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, limit, startAfter, type QueryDocumentSnapshot, type DocumentData } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import type { Producto } from '../../../types/Producto';
import { ProductoItem } from '../ProductoItem/ProductoItem';

const ProductosNacionales = () => {
  // Estados del componente
  const [productos, setProductos] = useState<Producto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cargando, setCargando] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [ultimoVisible, setUltimoVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hayMas, setHayMas] = useState(true);

  const PRODUCTOS_POR_PAGINA = 4;

  const mapearProductos = useCallback(
    (docs: QueryDocumentSnapshot<DocumentData>[]): Producto[] =>
      docs.map((doc) => {
        const data = doc.data() as Partial<Producto>;
        return {
          ...data,
          id: doc.id,
          nombre: data.nombre ?? 'Sin nombre',
          precio: Number(data.precio ?? 0),
          imagen: data.imagen ?? '',
          descripcion: data.descripcion ?? '',
          categoria: data.categoria ?? '',
          stock: Number(data.stock ?? 0),
          cantidad: Number(data.cantidad ?? 0),
        } as Producto;
      }),
    []
  );

  const obtenerKeyProducto = (prod: Producto, index: number) =>
    `${prod.id || 'sin-id'}-${prod.nombre || 'sin-nombre'}-${index}`;

  const obtenerProductosIniciales = useCallback(async () => {
    setCargando(true);

    try {
      const productosDB = collection(db, "productos nacionales");
      const q = query(productosDB, limit(PRODUCTOS_POR_PAGINA));
      const resp = await getDocs(q);
      const productosData = mapearProductos(resp.docs);

      setProductos(productosData);

      const ultimoDoc = resp.docs[resp.docs.length - 1] ?? null;
      setUltimoVisible(ultimoDoc);
      setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
    } catch (error) {
      console.error("Error al obtener productos: ", error);
    } finally {
      setCargando(false);
    }
  }, [mapearProductos]);

  useEffect(() => {
    void obtenerProductosIniciales();
  }, [obtenerProductosIniciales]);

  const obtenerMasProductos = async () => {
    if (!hayMas || cargandoMas || !ultimoVisible) return;

    setCargandoMas(true);

    try {
      const productosDB = collection(db, "productos nacionales");
      const q = query(productosDB, startAfter(ultimoVisible), limit(PRODUCTOS_POR_PAGINA));
      const resp = await getDocs(q);
      const productosData = mapearProductos(resp.docs);

      setProductos((productosAnteriores) => [...productosAnteriores, ...productosData]);

      const ultimoDoc = resp.docs[resp.docs.length - 1] ?? null;
      setUltimoVisible(ultimoDoc);
      setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
    } catch (error) {
      console.error("Error al cargar mas productos: ", error);
    } finally {
      setCargandoMas(false);
    }
  };

  // Simplemente vuelve a llamar a la funcion que trae la primera pagina, reseteando el estado.
  const verMenos = () => {
    obtenerProductosIniciales();
    // Opcional: Desplazar la vista hacia arriba
    window.scrollTo(0, 0);
  }

  // Filtro de busqueda sobre los productos ya cargados
  const productosFiltrados = productos.filter(prod =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Renderizado de carga inicial
  if (cargando) {
    return (
      <Container className="text-center p-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar en los productos cargados..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        {/* Mapeo de productos filtrados */}
        {productosFiltrados.length === 0 ? (
          <Col>
            <Alert variant="light">No se encontraron productos con esa búsqueda.</Alert>
          </Col>
        ) : (
          productosFiltrados.map((prod, index) => (
            <Col key={obtenerKeyProducto(prod, index)} xs={12} md={6} lg={3} className="mb-4">
              <ProductoItem producto={prod} />
            </Col>
          ))
        )}
      </Row>

      {/* Logica de renderizado para los botones --- */}
      <Row className="mt-4">
        <Col className="text-center d-flex justify-content-center gap-2">
          {/* El boton "Ver menos" solo aparece si hay mas de una pagina cargada */}
          {productos.length > PRODUCTOS_POR_PAGINA && (
            <Button variant="secondary" onClick={verMenos}>
              Ver menos
            </Button>
          )}

          {/* Boton "Cargar mas" */}
          {hayMas ? (
            <Button onClick={obtenerMasProductos} disabled={cargandoMas}>
              {cargandoMas ? <Spinner as="span" animation="border" size="sm" /> : 'Cargar mas'}
            </Button>
          ) : (
            // No mostramos el alert si solo hay una pagina de resultados
            productos.length > PRODUCTOS_POR_PAGINA && <Alert variant="light" className="m-0">No hay mas productos para mostrar.</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductosNacionales;