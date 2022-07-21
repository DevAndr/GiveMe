import styles from '../../../styles/Home.module.css'
import ButtonSocial from '../buttons/ButtonSocial';

const Footer = () => {

    return (
        <footer className={styles.footer}>
      <p>Пользовательское соглашение</p>
      <p>Политика конфиденциальности</p>
      <p>Поддержка</p>
      
       <ButtonSocial/>
      
      </footer>
    )
}

export default Footer