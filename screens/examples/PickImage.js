import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {Button, Stack, Image} from 'native-base'

export default function ImagePickerComponent() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <Stack flex={1} alignItems='center' justifyContent={'center'}>
      {image && <Image mb='1' source={{ uri: image }} size='2xl' shadow={'2'} alt='view' />}
      <Button onPress={pickImage} className='bg-[red]'>Pick an image from camera roll</Button>
    </Stack>
  );
}