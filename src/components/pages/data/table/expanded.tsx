import { axGetCCAData } from "@services/cca.service";
import React from "react";


export default function ExpandedComponent(props) {

  const ccaId = props.data.id


  const loadMore = async () => {
    const res = await axGetCCAData(ccaId);

    console.warn(res)

  };


  return (
    <div>
      <p>{JSON.stringify(loadMore)}</p>
    </div>
  );
}
