const config = {
  apiKey: 'AIzaSyC8s2TGrAw2gGceyg4sflYppNyLx-t9Pk4',
  authDomain: 'react-slack-0.firebaseapp.com',
  databaseURL: 'https://react-slack-0.firebaseio.com',
  projectId: 'react-slack-0',
  storageBucket: 'react-slack-0.appspot.com',
  messagingSenderId: '74042244704',
};

firebase.initializeApp(config);

const messagesRef = (room = '') => firebase.database().ref(`messages/${room}`);

let lastRoom = 'general';

const messages = {};

messages.add = function (room, {avatarUrl = '', name = '', text, timestamp}) {
  messagesRef(room).push().set({
    avatarUrl,
    name,
    room,
    text,
    time: timestamp.getTime(),
  });
};

messages.listen = function (room, callback) {
  const MESSAGE_LIMIT = 50;
  messagesRef(lastRoom).off('child_added');
  lastRoom = room;
  messagesRef(room).limitToLast(MESSAGE_LIMIT).on('child_added', (data) => {
    const {avatarUrl, name, room, text, time} = data.val();
    const message = {
      avatarUrl,
      name,
      room,
      text,
      timestamp: new Date(time),
    };
    callback(message);
  });
};

messages.getAll = function (room, callback) {
  messagesRef(room).once('value', (snapshots) => {
    const messages = [];
    snapshots.forEach(snapshot => {
      const message = snapshot.val();
      message.timestamp = new Date(message.time);
      messages.push(message);
    });
    callback(messages);
  });
};
