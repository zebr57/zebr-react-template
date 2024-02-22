import { useState, useEffect } from "react";
import { Table, Space, Tag } from "antd";
import PropTypes from "prop-types";

const data1 = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "4",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "5",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "6",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "7",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "8",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "9",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  },
  {
    key: "10",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "11",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "12",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
const data2 = [
  {
    key: "4",
    name: "John Brown2",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "5",
    name: "Jim Green2",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "6",
    name: "Joe Black2",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];

function TableBox(props) {
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      position: ["none", "bottomRight"],
      current: 1,
      total: 200,
      pageSize: 20
    }
  });
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a
            onClick={() => {
              setData(data.filter((e) => record.name !== e.name));
            }}
          >
            Delete
          </a>
        </Space>
      )
    }
  ];

  const getTableData = () => {
    setLoading(true);
    setTimeout(() => {
      console.log(getParams());
      if (getParams().page !== 1) {
        setData(data2);
      } else {
        setData(data1);
      }
      setLoading(false);
    }, 1500);
  };
  const getParams = () => {
    return {
      ...props.searchParams,
      page: tableParams.pagination.current,
      size: tableParams.pagination.pageSize
    };
  };
  /* ===================================== useEffect ===================================== */
  useEffect(() => {
    getTableData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableParams]);

  // 如果外层有查询条件时，需要重置页码：props.searchParams.page 设为1
  useEffect(() => {
    if (props.searchParams.page) {
      const pagination = tableParams.pagination;
      setTableParams({
        ...tableParams,
        pagination: { ...pagination, current: props.searchParams.page }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchParams]);
  /* ===================================== Event ===================================== */
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter
    });
  };
  return (
    <div>
      <Table
        columns={columns}
        pagination={tableParams.pagination}
        rowKey={(record) => record.key}
        loading={loading}
        dataSource={data}
        bordered
        scroll={{ y: props.scrollY }}
        onChange={handleTableChange}
      />
    </div>
  );
}

TableBox.propTypes = {
  scrollY: PropTypes.string
};
TableBox.defaultProps = {
  scrollY: "calc(100vh - 240px)"
};

export default TableBox;
