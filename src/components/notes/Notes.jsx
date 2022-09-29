import { useContext } from 'react';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
//components
import Form from './Form';
import EmptyNotes from './EmptyNotes';
import { useState, useEffect } from "react";
import Axios from 'axios';
import SwipeDrawer from '../SwipeDrawer';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {
    const User = localStorage.getItem("token");
    // const { notes, setNotes } = useContext(DataContext);
    const [noteList, setNoteList] = useState({
       
    });
    const [newName, setNewName] = useState('');
    const [newTitle, setNewTitle] = useState('');


    useEffect(() => {
        Axios.get(`http://localhost:8081/api/users/read/${User}`).then((response) => {
            setNoteList(response.data);
            //   console.log(response);
        });
    }, []);

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
            newTitle:newTitle,
        }).then(() => {
            setNoteList(noteList.map((note) => {
                return note._id === id
                    ? { _id: id,title:newTitle, text: newName }
                    : note;
            }))
        })
    };


    return (
        <div>
           
            <SwipeDrawer/>
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
                                                        <Card  style={{marginLeft:"400px"}}>

                                                            <CardContent style={{width:"400px",height:"200px"}}>
                                                                <Typography gutterBottom variant="h5" component="div">
                                                                    <h2 style={{
                                                                        marginTop:"10px",

                                                                    }}>{note.title}</h2>
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    <h4>{note.text}</h4>
                                                                </Typography>
                                                            </CardContent>
                                                            <CardActions>
                                                           
                                                                <button onClick={() => deleteNote(note._id)} 
                                                                style={{
                                                                    marginTop:"-5px",
                                                                    marginLeft:"-5px",
                                                                    backgroundColor:"whitesmoke",
                                                                    border:"none"
                                                                }}
                                                                ><DeleteSharpIcon /></button>
                                                                <input type="text" placeholder={note.title} 
                                                                   style={{
                                                                    width:"50px",
                                                                    border:"none"
                                                                }}
                                                                 onChange={(event) => {
                                                                    setNewTitle(event.target.value);
                                                                }} />
                                                                <br />
                                                                <input type="text" placeholder={note.text} 
                                                                style={{
                                                                    width:"50px",
                                                                    border:"none"
                                                                }}
                                                                 onChange={(event) => {
                                                                    setNewName(event.target.value);
                                                                }} />
                                                              
                                                               <button onClick={() => updateNote(note._id)} style={{
                                                                    marginTop:"10px",
                                                                    marginRight:"20px",
                                                                    backgroundColor:"#FFFFFF",
                                                                    border:"none"
                                                                }}><UpdateRoundedIcon /></button>
                                                            </CardActions>
                                                        </Card>
                                                 
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