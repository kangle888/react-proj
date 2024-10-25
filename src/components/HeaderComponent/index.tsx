import { Header } from "antd/es/layout/layout";
import styles from "./HeaderComponent.module.less";
import chevronDownIcon from "../../assets/headeImg/chevron-down-icon.png";
import personalIcon from "../../assets/headeImg/personal-icon.png";

const HeaderComponent = () => {
  return (
    <Header style={{ padding: 0, background: "#0F1F48" }}>
      <div className={styles.headerContent}>
        <img className={styles.headeImg} src={personalIcon} alt="" />
        <span>欢迎您，admin</span>
        <img className={styles.headeImg} src={chevronDownIcon} alt="" />
      </div>
    </Header>
  );
};

export default HeaderComponent;
