import React, { Component } from 'react'
import clsx from 'clsx';

import { Grid, Paper, Button, ButtonGroup } from '@material-ui/core'

import Title from '../components/Title'

class Selection extends Component {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        const classes = this.props.classes
        const { speakerId, /*handleChangeSpeaker,*/ handleSelectLength, isLoading } = this.props
        const fixedHeightDates = clsx(classes.paper, classes.fixedHeightDates);

        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper elevation={0} className={fixedHeightDates}>
                    <Title>Nombre de mots</Title>
                        <ButtonGroup 
                            size="large" 
                            color="primary" 
                            disabled={isLoading}
                            fullWidth={true}
                        >
                            <Button onClick={()=>handleSelectLength(100)} >100</Button>
                            <Button onClick={()=>handleSelectLength(500)} >500</Button>
                            <Button onClick={()=>handleSelectLength(1000)} >1000</Button>
                            <Button onClick={()=>handleSelectLength(5000)} >5000</Button>
                            <Button onClick={()=>handleSelectLength(10000)} >10000</Button>
                        </ButtonGroup>
                    </Paper>
                </Grid>
              <Grid item xs={12} md={3} lg={3}>
                    <Paper elevation={0} className={fixedHeightDates}>
                        
                        <Title>Speaker</Title>
                        
                        <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        >
                            <Grid item>
                                <img src={`${process.env.PUBLIC_URL}/emacron.jpg`} alt="emacron" width={speakerId === 0 ? 120 : 80}></img>
                            </Grid>
                            <Grid item>
                                <img src={`${process.env.PUBLIC_URL}/dtrump.jpg`} alt="dtrump" width={speakerId === 1 ? 120 : 80}></img>
                            </Grid>
                        
                        </Grid>
                    </Paper>
                </Grid>
   

            </Grid>
        )
    }

}

export default Selection
