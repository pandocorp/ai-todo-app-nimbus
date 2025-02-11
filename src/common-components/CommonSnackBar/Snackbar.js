import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function CommonSnackBar(props) {
    const [openSnackBar, setOpenSnackBar] = React.useState(false)
    React.useEffect(() => {
        setOpenSnackBar(props.condition)
    }, [props.condition])
    return (
        <>
            <Snackbar open={openSnackBar} autoHideDuration={10000} onClose={() => {
                props.close(false)
                setOpenSnackBar(false)
                }}>
                <Alert onClose={() => {
                    setOpenSnackBar(false)
                    props.close(false)
                    }} severity={props.type} sx={{ width: '100%', fontSize: '1.4rem', fontWeight: 400, alignItems: 'center' }}>
                    {props.message}
                </Alert>
            </Snackbar>
        </>
    )
}