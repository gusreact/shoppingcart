import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Container, Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import type { Cupon } from '../../types/Cupon';
import { FormularioCuponContainer } from '../FormularioCuponFeature/FormularioCuponContainer/FormularioCuponContainer';

const GestionCupones = () => {
    const [cupones, setCupones] = useState<Cupon[]>([]);
    const estadoInicialForm = {
        id: '',
        codigo: '',
        porcentaje: 0,
    };
    useEffect(() => {
        const fetchCupones = async () => {
            const cuponesRef = collection(db, "cupones");
            const resp = await getDocs(cuponesRef);

            setCupones(
                resp.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        codigo: data.codigo,
                        porcentaje: data.porcentaje,
                    };
                })
            );
        };

        void fetchCupones();
    }, []);
    
    const handleDelete = async (id: string) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este cupón?");
        if (confirmacion) {
            const docRef = doc(db, "cupones", id);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setCupones(cupones.filter(cupon => cupon.id !== id));
            alert("Cupón eliminado.");
        }
    };

    return (
        <Container className="py-4">
            <Row className="g-4 align-items-start">
                <Col lg={5}>
                    <Card className="shadow-sm border-0 rounded-4 h-100">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div>
                                    <h2 className="mb-1">Gestión de Cupones</h2>
                                </div>
                            </div>
                            <FormularioCuponContainer estadoInicialForm={estadoInicialForm} setCupones={setCupones} />
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={7}>
                    <Card className="shadow-sm border-0 rounded-4">
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <div>
                                    <h3 className="mb-1">Lista de Cupones</h3>
                                    <p className="text-muted mb-0">Visualizá todos los descuentos disponibles.</p>
                                </div>
                                <Badge bg="primary" pill>{cupones.length}</Badge>
                            </div>

                            {cupones.length === 0 ? (
                                <div className="text-center text-muted py-4">
                                    No hay cupones cargados aún.
                                </div>
                            ) : (
                                <ListGroup variant="flush">
                                    {cupones.map((cupon) => (
                                        <ListGroup.Item
                                            key={cupon.id}
                                            className="d-flex justify-content-between align-items-center rounded-3 mb-2 border"
                                        >
                                            <div>
                                                <div className="fw-semibold">{cupon.codigo}</div>
                                                <small className="text-muted">Descuento del {cupon.porcentaje}%</small>
                                            </div>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDelete(cupon.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default GestionCupones;
        