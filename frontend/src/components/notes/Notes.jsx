import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
//components
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Form from './Form';
import EmptyNotes from './EmptyNotes';
import { useState, useEffect } from "react";
import Axios from 'axios';
import SwipeDrawer from '../SwipeDrawer';
import './Note.css';
const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {
    const User = localStorage.getItem("token");
    const [noteList, setNoteList] = useState({
    });

    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');

    useEffect(() => {
        Axios.get(`http://localhost:8081/api/users/read/${User}`).then((response) => {
            setNoteList(response.data);
            console.log(response);
        });
    });


    const deleteNote = (id) => {
        Axios.delete(`http://localhost:8081/api/users/delete/${id}`).then(() => {
            setNoteList(
                noteList.filter((note) => {
                    return note._id !== id;

                })
            );
        });
    };

    const updateNote = (id) => {
        Axios.put("http://localhost:8081/api/users/update", {
            id: id,
            newName: newName,
            newTitle: newTitle,
        }).then(() => {
            setNoteList(noteList.map((note) => {
                return note._id === id
                    ? { _id: id, title: newTitle, text: newName }
                    : note;
            }))
        })
    };
    //color
    const [color, setColor] = useState("white");
    const mystyle = {
        backgroundColor: color,
        width: "400px",
        height: "300px",
        borderRadius: "40px",
    };
    const buttonstyle1 = {
        backgroundColor: "#A569BD",
        display: "flex",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        opacity: "90%",
    };
    const buttonstyle2 = {
        backgroundColor: "#FCF3CF",
        display: "flex",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        opacity: "90%",
    };

    const buttonstyle3 = {
        backgroundColor: "#D6EAF8",
        display: "flex",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        opacity: "90%",
    };
    const buttonstyle4 = {
        backgroundColor: "#48C9B0",
        display: "flex",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        opacity: "90%",
    };
    const buttonstyle5 = {
        backgroundColor: "#F7DC6F",
        display: "flex",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        opacity: "90%",
    };
    const buttonstyle6 = {
        backgroundColor: "#8EEDF8 ",
        display: "flex",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        opacity: "90%",
    };
    const buttonstyle7 = {
        backgroundColor: "#E3706A",
        display: "flex",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        border: "none",
        opacity: "90%",
    };


    return (
        <div>

            <SwipeDrawer />
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Box sx={{ p: 3, width: '100%' }}>
                    <DrawerHeader />
                    <Form />
                    {noteList.length > 0 ?
                        <DragDropContext >
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <Grid container style={{ marginTop: 16 }}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {
                                            noteList.map((note, index) => (
                                                <Draggable key={note.id} draggableId={note.id} index={index}>

                                                    {(provided, snapshot) => (
                                                        <Grid ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            item
                                                        >
                                                            <div class="c">
                                                                <div class="grid-container">
                                                                    <div class="grid-item" >
                                                                        <Card style={{ width: "500px", borderRadius: "30px" }} >


                                                                            <CardContent style={mystyle} class="c2">
                                                                                <Typography gutterBottom variant="h5" component="div">
                                                                                    <h2 style={{
                                                                                        marginTop: "10px",

                                                                                    }}>{note.title}</h2>
                                                                                </Typography>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    <h4 class="text">{note.text}</h4>
                                                                                </Typography>
                                                                            </CardContent>
                                                                            <CardActions className='n'>

                                                                                <button onClick={() => deleteNote(note._id)}
                                                                                    style={{
                                                                                        marginTop: "-5px",
                                                                                        marginLeft: "-5px",
                                                                                        backgroundColor: "white",
                                                                                        border: "none"
                                                                                    }}
                                                                                > <Fab color="danger" aria-label="edit">
                                                                                        <DeleteIcon />
                                                                                    </Fab></button>
                                                                                <input type="text" placeholder={note.title}
                                                                                    style={{
                                                                                        width: "50px",
                                                                                        border: "none"
                                                                                    }}
                                                                                    onChange={(event) => {
                                                                                        setNewTitle(event.target.value);
                                                                                    }} />
                                                                                <br />
                                                                                <input type="text" placeholder={note.text}
                                                                                    style={{
                                                                                        width: "50px",
                                                                                        border: "none"
                                                                                    }}
                                                                                    onChange={(event) => {
                                                                                        setNewName(event.target.value);
                                                                                    }} />

                                                                                <button onClick={() => updateNote(note._id)} style={{
                                                                                    marginTop: "10px",
                                                                                    marginRight: "20px",
                                                                                    backgroundColor: "white",
                                                                                    border: "none"
                                                                                }} >  <Fab color="secondary" aria-label="edit">
                                                                                        <EditIcon />
                                                                                    </Fab></button>
                                                                                <ButtonGroup aria-label="outlined primary button group">
                                                                                    <Button onClick={() => setColor("#A569BD")} style={buttonstyle1}></Button>
                                                                                    <Button onClick={() => setColor("#FCF3CF")} style={buttonstyle2}></Button>
                                                                                    <Button onClick={() => setColor("#D6EAF8")} style={buttonstyle3}></Button>
                                                                                    <Button onClick={() => setColor("#48C9B0")} style={buttonstyle4}></Button>
                                                                                    <Button onClick={() => setColor("#F7DC6F")} style={buttonstyle5}></Button>
                                                                                    <Button onClick={() => setColor("#8EEDF8 ")} style={buttonstyle6}></Button>
                                                                                    <Button onClick={() => setColor("#E3706A")} style={buttonstyle7}></Button>
                                                                                </ButtonGroup>



                                                                            </CardActions>
                                                                        </Card>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    )}
                                                </Draggable >
                                            ))
                                        }
                                    </Grid>
                                )}
                            </Droppable >
                        </DragDropContext>
                        : <EmptyNotes />}
                </Box>
            </Box>
        </div>
    )
}

export default Notes;