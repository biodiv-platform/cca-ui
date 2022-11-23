import { axVerifyContributorPermission } from "@services/cca.service";
import React, { useEffect, useState } from "react";

import Processing from "../processing";

export default function VerifyRequestComponent({ token, type }) {
    const [status, setStatus] = useState({ loading: true, success: false });

    useEffect(() => {
        switch (type) {
            case "cca-contibutor-request":
                axVerifyContributorPermission(token).then((res) => setStatus({ loading: false, ...res }));
                break;
        }
    }, []);

    return <Processing {...status} />;
}
