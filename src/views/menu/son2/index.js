import { useState } from "react";
import SearchBox from "../../../components/common/searchBox/SearchBox";
import TableBox from "../../../components/common/tableBox/TableBox";

function Son2() {
  const [searchParams, setSearchParams] = useState({ name: "joe", age: 30 });
  const setFromData = (e) => {
    setSearchParams(e);
  };

  return (
    <div className="son2-page">
      <div style={{ marginBottom: "16px" }}>
        <SearchBox setFromData={setFromData}></SearchBox>
      </div>
      <TableBox searchParams={searchParams} scrollY={"calc(100vh - 288px)"}></TableBox>
    </div>
  );
}

export default Son2;
