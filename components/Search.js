/* eslint-disable react/prop-types */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import Expandable from 'react-native-expandable';

export default function Search({ value, checksSearchBy, onChangeCheck, onChange }) {
  return (
    <>
      <View style={{ paddingHorizontal: 10 }}>
        <Expandable title="Search by" collapsed>
          <ScrollView>
            <CheckBox
              checked={checksSearchBy.title}
              onPress={() => onChangeCheck('title', !checksSearchBy.title)}
              title="Title"
            />
            <CheckBox
              checked={checksSearchBy.description}
              onPress={() => onChangeCheck('description', !checksSearchBy.description)}
              title="Description"
            />
            <CheckBox
              checked={checksSearchBy.date}
              onPress={() => onChangeCheck('date', !checksSearchBy.date)}
              title="Date"
            />
            <CheckBox
              checked={checksSearchBy.tags}
              onPress={() => onChangeCheck('tags', !checksSearchBy.tags)}
              title="Tag"
            />
          </ScrollView>
        </Expandable>
      </View>
      <SearchBar lightTheme placeholder="Search here..." onChangeText={onChange} value={value} />
    </>
  );
}
