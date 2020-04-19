/* eslint-disable react/prop-types */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import moment from 'moment';

export default function Notes({ data, onRemoveNote, onUpdateNote, navigation }) {
  return (
    <View
      style={{
        padding: 15,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
      }}>
      <View
        onTouchStart={() => {
          navigation.navigate('Note', {
            note: {
              id: data.length + 1,
              title: moment(new Date()).format('DD-MM-YY HH:mm:ss'),
              date: new Date(),
              description: '',
              tags: []
            },
            onUpdateNote,
            onRemoveNote
          });
        }}
        style={{
          width: '50%',
          height: 150,
          padding: 10
        }}>
        <View
          style={{
            flex: 1,
            borderRadius: 20,
            justifyContent: 'center',
            borderColor: 'red',
            borderWidth: 1
          }}>
          <Text style={{ textAlign: 'center' }}>Create a new Note!</Text>
        </View>
      </View>
      {data.map(({ id, title, date, description, tags }) => (
        <View
          key={id}
          onTouchStart={() => {
            navigation.navigate('Note', {
              note: { id, title, date, description, tags },
              onUpdateNote,
              onRemoveNote
            });
          }}
          style={{
            width: '50%',
            height: 150,
            padding: 10
          }}>
          <View
            style={{ flex: 1, padding: 5, borderRadius: 20, borderColor: 'red', borderWidth: 1 }}>
            <Text style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}>{title}</Text>
            <Text style={{ borderBottomColor: 'gray', borderBottomWidth: 1 }}>
              {moment(date).format('DD-MM-YY HH:mm:ss')}
            </Text>
            <Text numberOfLines={2} style={{ height: 35 }}>
              {description}
            </Text>
            <ScrollView
              onTouchStart={e => e.stopPropagation()}
              horizontal
              style={{
                marginTop: 10
              }}>
              {tags.map(tag => (
                <Text
                  key={tag}
                  style={{
                    padding: 5,
                    marginHorizontal: 3,
                    backgroundColor: 'lightgray',
                    borderRadius: 15
                  }}>
                  {tag}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      ))}
    </View>
  );
}
