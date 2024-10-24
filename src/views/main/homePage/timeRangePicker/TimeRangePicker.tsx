import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import styles from './TimeRangePicker.module.less';

dayjs.extend(customParseFormat);

interface TimeRangePickerProps {
  onTimeChange: (startTime: Dayjs | null, endTime: Dayjs | null) => void; // 接收父组件传递的回调函数
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ onTimeChange }) => {
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [isHoveredStart, setIsHoveredStart] = useState(false);
  const [isHoveredEnd, setIsHoveredEnd] = useState(false);

  const handleStartChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStartTime = dayjs(event.target.value);
    setStartTime(newStartTime);

    if (newStartTime.isAfter(endTime) || !endTime) {
      const newEndTime = newStartTime.add(15, 'minute');
      setEndTime(newEndTime);
      onTimeChange(newStartTime, newEndTime); // 通知父组件更新时间
    } else {
      onTimeChange(newStartTime, endTime); // 仅更新开始时间
    }
  };

  const handleEndChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newEndTime = dayjs(event.target.value);
    setEndTime(newEndTime);

    if (newEndTime.isBefore(startTime)) {
      const newStartTime = newEndTime.subtract(15, 'minute');
      setStartTime(newStartTime);
      onTimeChange(newStartTime, newEndTime); // 通知父组件更新时间
    } else {
      onTimeChange(startTime, newEndTime); // 仅更新结束时间
    }
  };

  const handleClearStart = () => {
    setStartTime(null);
    setEndTime(null);
    onTimeChange(null, null); // 清空选择框内容时，通知父组件
  };

  const handleClearEnd = () => {
    setEndTime(null);
    onTimeChange(startTime, null); // 仅清空结束时间
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
            <option value="" disabled>请选择时间</option>
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
            <option value="" disabled>请选择时间</option>
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
