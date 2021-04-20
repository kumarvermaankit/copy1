//`http://localhost:5000/upload`

import Community from "./community"

function CommunityFile(){

    const url=`http://localhost:5000`

    return(
        <Community url={`${url}/upload`} />
    )
}

export default CommunityFile;