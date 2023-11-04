import { Skeleton } from '@mui/material'
import React, { Fragment } from 'react'

function LoadingComponent() {

    return (
        <Fragment>
            <Skeleton variant="rectangular" width={"100%"} height={"auto"} />
        </Fragment>
    )
}

export default LoadingComponent