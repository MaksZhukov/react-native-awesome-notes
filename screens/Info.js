/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, Linking, SectionList } from 'react-native';

export default function NoteScreen() {
  return (
    <View style={{ padding: 15 }}>
      <SectionList
        sections={[
          {
            title: 'To create a note:',
            data: [
              'Press on a box with text "Create a new Note!" on Notes screen',
              'Fill fields: title, description, tags',
              'Press Save',
              'See a message: "Note has been updated"'
            ]
          },
          {
            title: 'To edit a note:',
            data: [
              'Press on a box with a created note on notes screen',
              'Edit fields: title, description, tags',
              'Press Save',
              'See a message: "Note has been updated"'
            ]
          },
          {
            title: 'To delete a note:',
            data: [
              'Press on a box with a created note on notes screen',
              'Press remove',
              'See a message: "Note has been removed"'
            ]
          },
          {
            title: 'To search a note:',
            data: [
              'Open searching filters on Notes screen',
              'Select fields you need',
              'Input search text in search field',
              'See the matched results'
            ]
          }
        ]}
        renderItem={({ item, index }) => (
          <Text style={{ paddingLeft: 10 }}>
            {index + 1}. {item}
          </Text>
        )}
        renderSectionHeader={({ section }) => (
          <Text
            style={{
              marginVertical: 10,
              fontWeight: 'bold',
              backgroundColor: 'rgba(200,200,200,1.0)'
            }}>
            {section.title}
          </Text>
        )}
        keyExtractor={(item, index) => index}
      />
      <Text style={{ marginTop: 20, textAlign: 'center' }}>
        Created by{' '}
        <Text
          onPress={() => {
            Linking.openURL('https://github.com/MaksZhukov');
          }}
          style={{
            color: 'blue',
            textDecorationLine: 'underline'
          }}>
          @Maks
        </Text>
      </Text>
    </View>
  );
}
