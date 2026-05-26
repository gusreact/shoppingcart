import { TarjetaContactoContainer } from "../TarjetaContactoFeature/TarjetaContactoContainer/TarjetaContactoContainer";
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <TarjetaContactoContainer />
            </div>
            <div className={styles.companyInfo}>
                <h3>Sobre la empresa</h3>
                <p>Empresa React S.A. — soluciones digitales, productos y diseño web.</p>
                <p>Contacto: info@empresa-react.com · +54 11 1234 5678</p>
            </div>
            <p>&copy; 2025 - Mi Aplicación React</p>
        </footer>
    );
}
export default Footer;