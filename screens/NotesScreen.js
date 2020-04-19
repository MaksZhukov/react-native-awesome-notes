/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { AsyncStorage, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Notes from '../components/Notes';
import Search from '../components/Search';

export default function NotesScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [checksSearchBy, setChecksSearchBy] = useState({
    title: false,
    description: false,
    date: false,
    tags: false
  });
  const handleChangeCheck = useCallback(
    (key, checked) => {
      setChecksSearchBy({ ...checksSearchBy, [key]: checked });
    },
    [checksSearchBy]
  );
  const fetchData = useCallback(async () => {
    const data = JSON.parse(await AsyncStorage.getItem('notes'));
    if (data) {
      setNotes(data);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  const handleUpdateNote = useCallback(
    async uNote => {
      const newNotes = notes.map(note => (note.id === uNote.id ? uNote : note));
      if (!newNotes.find(note => note.id === uNote.id)) {
        newNotes.push(uNote);
      }
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setNotes(newNotes);
      console.log('hello');
      showMessage({
        message: 'Note has been updated',
        type: 'success',
        duration: 400,
        titleStyle: { textAlign: 'center' }
      });
    },
    [notes]
  );

  const handleRemoveNote = useCallback(
    async id => {
      const newNotes = notes.filter(note => note.id !== id);
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setNotes(newNotes);
      showMessage({
        message: 'Note has been removed',
        type: 'success',
        duration: 400,
        titleStyle: { textAlign: 'center' }
      });
    },
    [notes]
  );

  const filteredNotes = useMemo(() => {
    if (!searchTerm) {
      return notes;
    }
    return notes.filter(note => {
      let isFound = false;
      Object.keys(checksSearchBy).forEach(key => {
        if (
          checksSearchBy[key] ||
          Object.keys(checksSearchBy).every(cKey => !checksSearchBy[cKey])
        ) {
          if (key === 'tags') {
            if (note[key].some(tag => tag.includes(searchTerm))) {
              isFound = true;
            }
          }
          if (note[key].includes(searchTerm)) {
            isFound = true;
          }
        }
      });
      return isFound;
    });
  }, [checksSearchBy, searchTerm, notes]);

  return (
    <>
      <Search
        checksSearchBy={checksSearchBy}
        onChangeCheck={handleChangeCheck}
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <Notes
        navigation={navigation}
        data={filteredNotes}
        onUpdateNote={handleUpdateNote}
        onRemoveNote={handleRemoveNote}
      />
    </>
  );
}
