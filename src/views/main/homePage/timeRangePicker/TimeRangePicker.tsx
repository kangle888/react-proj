import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from './TimeRangePicker.module.less';

dayjs.extend(customParseFormat);

const TimeRangePicker = () => {
  const [startTime, setStartTime] = useState<Dayjs | null>(null); // 设置状态为 Dayjs | null
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [isHoveredStart, setIsHoveredStart] = useState(false);
  const [isHoveredEnd, setIsHoveredEnd] = useState(false);

  const handleStartChange = (event : any) => {
    const newStartTime = dayjs(event.target.value);
    setStartTime(newStartTime);

    if (newStartTime.isAfter(endTime) || !endTime) {
      setEndTime(newStartTime.add(15, 'minute')); // 更新结束时间
    }
  };

  const handleEndChange = (event: any) => {
    const newEndTime = dayjs(event.target.value);
    setEndTime(newEndTime);

    if (newEndTime.isBefore(startTime)) {
      setStartTime(newEndTime.subtract(15, 'minute')); // 更新开始时间
    }
  };

  const handleClearStart = () => {
    setStartTime(null); // 清空选择框内容
    setEndTime(null); // 清空结束时间
  };

  const handleClearEnd = () => {
    setEndTime(null); // 清空选择框内容
  };

  const generateTimeOptions = () => {
    const times = [];
    const today = dayjs().startOf('day');
    for (let i = 0; i < 24 * 4; i++) {
      const time = today.add(i * 15, 'minute').format('YYYY-MM-DD HH:mm');
      times.push(time);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div>
      <label>
        开始时间:
        <div 
          className={`${styles.timeSelectContainer} ${isHoveredStart ? styles.hovered : ''}`}
          onMouseEnter={() => setIsHoveredStart(true)}
          onMouseLeave={() => setIsHoveredStart(false)}
        >
          <select 
            className={styles.timeSelect} 
            value={startTime ? startTime.format('YYYY-MM-DD HH:mm') : ''}
            onChange={handleStartChange}
          >
            <option value="" disabled>请选择时间</option> {/* 默认选项 */}
            {timeOptions.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {isHoveredStart && (
            <CloseCircleOutlined onClick={handleClearStart} className={styles.icon} />
          )}
          {!isHoveredStart && (
            <ClockCircleOutlined className={styles.icon} />
          )}
        </div>
      </label>
      <br /><br />
      <label>
        结束时间:
        <div 
          className={`${styles.timeSelectContainer} ${isHoveredEnd ? styles.hovered : ''}`}
          onMouseEnter={() => setIsHoveredEnd(true)}
          onMouseLeave={() => setIsHoveredEnd(false)}
        >
          <select 
            className={styles.timeSelect} 
            value={endTime ? endTime.format('YYYY-MM-DD HH:mm') : ''}
            onChange={handleEndChange}
          >
            <option value="" disabled>请选择时间</option> {/* 默认选项 */}
            {timeOptions.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {isHoveredEnd && (
            <CloseCircleOutlined onClick={handleClearEnd} className={styles.icon} />
          )}
          {!isHoveredEnd && (
            <ClockCircleOutlined className={styles.icon} />
          )}
        </div>
      </label>
    </div>
  );
};

export default TimeRangePicker;
