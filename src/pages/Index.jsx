import { Container, SimpleGrid, Box, Input, Textarea, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Note = ({ note, onDelete, onEdit }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleEdit = () => {
    onEdit(note.id, title, content);
    onClose();
  };

  return (
    <>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Text fontWeight="bold" fontSize="xl">{note.title}</Text>
        <Text mt={4}>{note.content}</Text>
        <IconButton aria-label="Edit" icon={<FaEdit />} onClick={onOpen} />
        <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => onDelete(note.id)} />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Note</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" mb={4} />
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEdit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: newTitle,
      content: newContent,
    };
    setNotes([...notes, newNote]);
    setNewTitle("");
    setNewContent("");
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
      <Input placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <Textarea placeholder="Content" value={newContent} onChange={(e) => setNewContent(e.target.value)} mt={2} />
      <Button onClick={addNote} mt={4} colorScheme="teal">Add Note</Button>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} mt={8}>
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;