import React, { Component } from 'react'
import clsx from 'clsx'

import { withStyles } from "@material-ui/core/styles"

import CssBaseline from '@material-ui/core/CssBaseline'

import Box from '@material-ui/core/Box'

import Typography from '@material-ui/core/Typography'

import Container from '@material-ui/core/Container'

import { Paper, CircularProgress } from '@material-ui/core'

import Selection from './Selection'

const dico = require(`../trigram_to_successors.json`)


function Microbe() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            Made with <span role="img" aria-label="virus"> 🦠 </span> by Big Ben

        </Typography>
    );
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        minHeight: 150,
    },
    fixedHeightResults: {
        minHeight: 50,
    },
})


class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: 'Sélectionnez un nombre de mots  ', 
            speakerId: 0,
            loadingGeneration: false,
            errorSearch: ''
        }
    }

    handleInputChange = async ev => {
        const { value, name } = ev.target
        this.setState({ [name]: value })
    }

    handleSelectLength = length => {
        const new_text = `Génération d'un discours de ${length} mots...`
        this.setState({ text: new_text, loadingGeneration: true })

        const deconstructed_text = ['START', 'START', 'START']
        
        let i = 0
        while(i<length){
            const last_trigram = deconstructed_text.slice(-3).join(' ')

            const random_index = Math.floor((Math.random() * dico[last_trigram].length))
            
            deconstructed_text.push(dico[last_trigram][random_index])
            if(dico[last_trigram][random_index] === 'END'){
                break;
            }
            i += 1
        }
        deconstructed_text.shift()
        deconstructed_text.shift()
        deconstructed_text.shift()

        this.setState({ text: deconstructed_text.join(' '), loadingGeneration: false })
    }

    handleChangeSpeaker = () => {

    }



    render() {
        const { classes } = this.props
        const { speakerId, loadingGeneration, text } = this.state

        //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
        const fixedHeightPaperResults = clsx(classes.paper, classes.fixedHeightResults)

        return (
            <div className={classes.root}>
                <CssBaseline />

                <main className={classes.content}>

                    <div className={classes.appBarSpacer} />

                    <Container maxWidth="lg" className={classes.container}>
                    <Selection classes={classes}
                            isLoading={loadingGeneration}
                            speakerId={speakerId}
                            handleChangeSpeaker={this.handleChangeSpeaker}
                            handleSelectLength={this.handleSelectLength}
                        />

                        <br />
                        <br />
                        <Paper className={fixedHeightPaperResults}>
                        <Typography component="p" variant="body1">
                            {text}
                        </Typography>
                        
                            
                            {loadingGeneration &&
                                <CircularProgress />
                            }
                        </Paper>
                        <br/>
                        
                        <Box pt={4}>
                            <Microbe />
                        </Box>
                    </Container>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)
