import React, { useState } from "react";
import { Button, Radio, Input, ConfigProvider } from "antd";
import AboutPageTable from "./aboutPageTable/aboutPageTable";
import styles from "./aboutPage.module.less";

export const AboutPage: React.FC = () => {
  const [selectedRadio, setSelectedRadio] = useState("a");

  const onChangeButton = (e: any) => {
    console.log(`radio checked:${e.target.value}`);
    setSelectedRadio(e.target.value);
  };

  return (
    <div>
      <div className={styles.searchContent}>
        <div className={styles.searchChild}>
          <span className={styles.searchLabel1}>时间</span>{" "}
          <Input placeholder="Basic usage" />
        </div>
        <div className={styles.searchChild}>
          <span className={styles.searchLabel2}>用户名</span>{" "}
          <Input placeholder="Basic usage" />
        </div>
        <div className={styles.searchChild}>
          <span className={styles.searchLabel3}>关键字</span>{" "}
          <Input placeholder="Basic usage" />
        </div>
        <div className={styles.searchButton}>
          <Button className={styles.customButton} type="primary">
            搜索
          </Button>
        </div>
      </div>
      <div className={styles.radioButton}>
        <ConfigProvider
          theme={{
            components: {
              Radio: {
                buttonBg: "f8f8f8",
                buttonSolidCheckedBg: " #0F1F48",
                buttonSolidCheckedHoverBg: "#0F1F48",
                buttonSolidCheckedActiveBg: "#0F1F48",
              },
            },
          }}
        >
          <Radio.Group
            defaultValue={selectedRadio}
            buttonStyle="solid"
            onChange={onChangeButton}
          >
            <Radio.Button value="a">病毒查杀</Radio.Button>
            <Radio.Button value="b">入侵防护</Radio.Button>
          </Radio.Group>
        </ConfigProvider>
      </div>

      {selectedRadio === "a" ? <AboutPageTable /> : <AboutPageTable />}
    </div>
  );
};
