import React from "react";
import { Table, Pagination, ConfigProvider } from "antd";
import type { TableColumnsType } from "antd";
import "./aboutPageTable.moudle.less";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  { title: "Column 2", dataIndex: "address", key: "2" },
  { title: "Column 3", dataIndex: "address", key: "3" },
  { title: "Column 4", dataIndex: "address", key: "4" },
  { title: "Column 5", dataIndex: "address", key: "5" },
  { title: "Column 6", dataIndex: "address", key: "6" },
  { title: "Column 7", dataIndex: "address", key: "7" },
  { title: "Column 8", dataIndex: "address", key: "8" },
  { title: "Column 9", dataIndex: "address", key: "9" },
  { title: "Column 10", dataIndex: "address", key: "10" },
  { title: "Column 11", dataIndex: "address", key: "11" },
];

const dataSource: DataType[] = [
  { key: "1", name: "Olivia", age: 32, address: "New York Park" },
  { key: "2", name: "Ethan", age: 40, address: "London Park" },
];

const AboutPageTable: React.FC = () => {
  return (
    <div>
      <Table<DataType>
        bordered
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "max-content" }}
        pagination={false}
      />
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: "#0F1F48",
            },
          },
        }}
      >
        <Pagination
          align="end"
          total={85}
          showTotal={(total) => (
            <div>
              <span className="total-count">{`共 ${total} 项数据`}</span>
            </div>
          )}
          defaultPageSize={20}
          defaultCurrent={1}
        />
      </ConfigProvider>
    </div>
  );
};

export default AboutPageTable;
