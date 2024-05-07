import { useState } from 'react';
import { Box, Button, Container, Input, SimpleGrid, Text, Textarea, useToast, VStack } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleEdit = () => {
    onEdit(note.id, title, content);
    setIsEditing(false);
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      {isEditing ? (
        <>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" mb={3} />
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
          <Button mt={3} onClick={handleEdit}>Save</Button>
        </>
      ) : (
        <>
          <Text fontSize="xl" fontWeight="bold">{note.title}</Text>
          <Text mt={4}>{note.content}</Text>
          <Button leftIcon={<FaTrash />} colorScheme="red" variant="ghost" onClick={() => onDelete(note.id)} mt={3}>
            Delete
          </Button>
          <Button mt={3} onClick={() => setIsEditing(true)}>Edit</Button>
        </>
      )}
    </Box>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const toast = useToast();

  const addNote = () => {
    if (!newTitle || !newContent) {
      toast({
        title: "Error",
        description: "Both title and content are required to add a note.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newNote = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
    };
    setNotes([...notes, newNote]);
    setNewTitle('');
    setNewContent('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id, title, content) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, title, content };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <Container maxW="container.xl" p={5}>
      <VStack spacing={4} mb={8}>
        <Input placeholder="New note title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <Textarea placeholder="New note content" value={newContent} onChange={(e) => setNewContent(e.target.value)} />
        <Button colorScheme="blue" onClick={addNote}>Add Note</Button>
      </VStack>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5}>
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;