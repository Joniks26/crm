import React, {useState} from 'react';
import {
    Grommet,
    Box,
    Button,
    Heading,
    Collapsible,
    ResponsiveContext,
    Layer
} from 'grommet';
import {Actions, FormClose, Sidebar} from 'grommet-icons';
import { deepMerge } from 'grommet/utils';
import {acme} from "./acme-theme";


const AppBar = (props: any) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{left: 'medium', right: 'small', vertical: 'small'}}
        elevation='medium'
        style={{zIndex: '1'}}
        {...props}
    />
);

const localTheme = {
    global: {
        colors: {
            brand: '#228BE6',
            focus: '#50c050',
        },
        font: {
            family: 'Montserrat, Roboto, sans-serif',
            size: '14px',
            lineHeight: '20px'
        },
        input: {
            padding: '5px',
        },
    },
};

const theme = deepMerge(localTheme, acme);

export const App = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <Grommet theme={theme} themeMode={darkMode ? 'dark' : 'light'} full>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <AppBar>
                            <Heading level='3' margin='none'>CRM</Heading>
                            <Button
                                primary
                                icon={!darkMode ? <Actions/> : <Actions color={'black'}/>}
                                alignSelf="center"
                                margin="xxsmall"
                                onClick={() => setDarkMode(!darkMode)}
                            />
                            <Button icon={<Sidebar/>} onClick={() => {setShowSidebar(!showSidebar)}}/>
                        </AppBar>
                        <Box direction='row' flex overflow={{horizontal: 'hidden'}}>
                            <Box flex align='center' justify='center'>
                                app body
                            </Box>
                            {(!showSidebar || size !== 'small') ? (
                                <Collapsible direction={'horizontal'} open={showSidebar}>
                                    <Box
                                        flex
                                        width='medium'
                                        background='light-2'
                                        elevation='small'
                                        align='center'
                                        justify='center'
                                    >
                                        sidebar
                                    </Box>
                                </Collapsible>
                            ) : (
                                <Layer>
                                    <Box

                                        tag='header'
                                        justify='end'
                                        align='center'
                                        direction='row'
                                    >
                                        <Button
                                            icon={<FormClose/>}
                                            onClick={() => setShowSidebar(false)}
                                        />
                                    </Box>
                                    <Box
                                        fill
                                        background='light-2'
                                        align='center'
                                        justify='center'
                                    >
                                        sidebar
                                    </Box>
                                </Layer>
                            )}
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
}