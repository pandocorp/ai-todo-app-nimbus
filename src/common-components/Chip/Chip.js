import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './chip.css';
const Chip = React.memo((props) => {
    return(
        <Card>
            <CardContent>
                <h2 style={{textAlign: 'center'}}>   
                    { props.value || props.children }
                </h2>
                <h3 style={{textAlign: 'center'}}>
                    { props.label }
                </h3>
            </CardContent>
        </Card>
    )
});

export default Chip;