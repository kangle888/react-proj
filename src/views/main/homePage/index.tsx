import { useState } from "react";
import TimeRangePicker from "./timeRangePicker/TimeRangePicker";
import { Dayjs } from "dayjs";
import { Input, Select } from "antd";
import styles from "./homePage.module.less";
const { TextArea } = Input;

export const HomePage: React.FC = () => {
  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(
    null
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>(null);

  // 定义回调函数
  const handleTimeChange = (startTime: Dayjs | null, endTime: Dayjs | null) => {
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    console.log("开始时间:", startTime?.format("YYYY-MM-DD HH:mm"));
    console.log("结束时间:", endTime?.format("YYYY-MM-DD HH:mm"));
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e);
  };
  return (
    <div className={styles.homePage}>
      <div className={styles.topTitle}>功能配置</div>
      <div className={styles.homeTopContent}>
        <div className={styles.homeTopContentLeft}>
          <span className={styles.span1}>全局锁定时间</span>
          <Input />
          <span className={styles.span2}>分钟</span>
        </div>
        <div className={styles.homeTopContentRight}>
          <span className={styles.span3}>处置策略</span>
          <Select
            placeholder="Outlined"
            style={{ flex: 1, width: "240px" }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
            ]}
          />
        </div>
      </div>
      <div className={styles.tipWord}>提示词</div>
      <div className={styles.homeTextArea}>
        <span className={styles.span4}>病毒查杀提示</span>
        <TextArea
          style={{ width: "461px" }}
          placeholder="textarea with clear icon"
          allowClear
          onChange={onChange}
        />
      </div>
      <div className={styles.homeTextArea} style={{ marginTop: "16px" }}>
        <span className={styles.span4}>入侵防护提示</span>
        <TextArea
          style={{ width: "461px" }}
          placeholder="textarea with clear icon"
          allowClear
          onChange={onChange}
        />
      </div>
      {/* <TimeRangePicker onTimeChange={handleTimeChange} /> */}
    </div>
  );
};
