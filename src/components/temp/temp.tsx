// import React, { useState } from "react";
// import { TimePicker } from "antd";
// import moment from "moment";

// const { RangePicker } = TimePicker;

// const App = () => {
//   const [times, setTimes] = useState([null, null]);

//   const onChange = (time) => {
//     setTimes(time);
//   };

//   const disabledHours = (selectedMoment, type) => {
//     // 限制结束时间的小时不能小于开始时间的小时
//     if (type === "end" && times[0]) {
//       return Array.from({ length: 24 }, (_, i) =>
//         i < times[0].hour() ? i : null
//       ).filter((x) => x !== null);
//     }
//     // 限制开始时间的小时不能大于结束时间的小时
//     if (type === "start" && times[1]) {
//       return Array.from({ length: 24 }, (_, i) =>
//         i > times[1].hour() ? i : null
//       ).filter((x) => x !== null);
//     }
//     return [];
//   };

//   const disabledMinutes = (selectedHour, type) => {
//     if (type === "end" && times[0] && selectedHour === times[0].hour()) {
//       // 限制结束时间的分钟不能小于开始时间的分钟
//       return Array.from({ length: 60 }, (_, i) =>
//         i < times[0].minute() ? i : null
//       ).filter((x) => x % 15 !== 0);
//     }
//     if (type === "start" && times[1] && selectedHour === times[1].hour()) {
//       // 限制开始时间的分钟不能大于结束时间的分钟
//       return Array.from({ length: 60 }, (_, i) =>
//         i > times[1].minute() ? i : null
//       ).filter((x) => x % 15 !== 0);
//     }
//     // 15分钟颗粒度
//     return Array.from({ length: 60 }, (_, i) =>
//       i % 15 !== 0 ? i : null
//     ).filter((x) => x !== null);
//   };

//   return (
//     <div>
//       <RangePicker
//         value={times}
//         onChange={onChange}
//         format="HH:mm"
//         minuteStep={15} // 设置15分钟的颗粒度
//         disabledHours={(time, type) => disabledHours(time, type)}
//         disabledMinutes={(hour, type) => disabledMinutes(hour, type)}
//       />
//     </div>
//   );
// };

// export default App;
