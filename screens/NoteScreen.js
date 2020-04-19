/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import Tags from 'react-native-tags';
import { showMessage } from 'react-native-flash-message';

export default function NoteScreen({
  route: {
    params: { note, onUpdateNote, onRemoveNote }
  }
}) {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(note);
  }, [note]);
  return (
    <View style={{ padding: 15 }}>
      <TextInput
        style={{ marginBottom: 10, padding: 5, borderBottomColor: 'gray', borderBottomWidth: 1 }}
        onChangeText={value => setData({ ...data, title: value })}
        value={data.title}
      />
      <TextInput
        multiline
        numberOfLines={4}
        style={{ marginBottom: 10, padding: 5, borderBottomColor: 'gray', borderBottomWidth: 1 }}
        onChangeText={value => setData({ ...data, description: value })}
        value={data.description}
      />
      <Tags initialTags={data.tags} onChangeTags={tags => setData({ ...data, tags })} />
      <View style={{ marginBottom: 10 }} />
      <Button
        title="Save"
        onPress={() => {
          if (!data.title) {
            showMessage({
              message: 'Title is required',
              type: 'error',
              animationDuration: 400,
              titleStyle: { textAlign: 'center' }
            });
          } else {
            onUpdateNote(data);
          }
        }}
      />
      <View style={{ marginBottom: 10 }} />
      <Button
        color="red"
        title="Remove"
        onPress={() => {
          onRemoveNote(data.id);
        }}
      />
    </View>
  );
}
