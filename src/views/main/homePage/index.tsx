import { useState } from 'react';
import TimeRangePicker from './timeRangePicker/TimeRangePicker';
import { Dayjs } from 'dayjs';

export const HomePage: React.FC = () => {
  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>(null);

  // 定义回调函数
  const handleTimeChange = (startTime: Dayjs | null, endTime: Dayjs | null) => {
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    console.log('开始时间:', startTime?.format('YYYY-MM-DD HH:mm'));
    console.log('结束时间:', endTime?.format('YYYY-MM-DD HH:mm'));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <TimeRangePicker onTimeChange={handleTimeChange} />
      <div>
        <p>选择的开始时间: {selectedStartTime ? selectedStartTime.format('YYYY-MM-DD HH:mm') : '未选择'}</p>
        <p>选择的结束时间: {selectedEndTime ? selectedEndTime.format('YYYY-MM-DD HH:mm') : '未选择'}</p>
      </div>
    </div>
  );
};
