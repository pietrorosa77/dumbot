import { nanoid } from 'nanoid';
import { NodeTypes } from './definitions';

const MessageNode = {
  id: 'MessageNode',
  type: 'message',
  user: false,
  content: 'Type your message here',
  position: {
    x: 0,
    y: 0
  },
  title: 'Message',
  output: {
    id: 'messageout',
    type: 'null'
  },
  ports: {
    default: {
      id: 'default',
      text: 'default',
      index: 0,
      properties: {}
    }
  }
};

const QuestionNode = {
  id: 'QuestionNode',
  type: NodeTypes.QUESTION,
  user: true,
  content: 'Can you answer this?',
  position: {
    x: 0,
    y: 0
  },
  title: 'Question',
  output: {
    id: 'questout',
    type: 'text'
  },
  properties: {
    type: 'text',
    pattern: '',
    validationMessage: '',
    placeholder: '',
    suggestions: [],
    long: false,
    displayAs: 'message'
  },
  ports: {
    default: {
      id: 'default',
      text: 'default',
      index: 0,
      properties: {}
    }
  }
};

const ButtonsNode = {
  id: 'ButtonsNode',
  type: NodeTypes.BUTTONS,
  user: true,
  content: 'pick the option!',
  position: {
    x: 0,
    y: 0
  },
  title: 'Single Choice',
  output: {
    id: 'SingleButtonChoice',
    type: 'text'
  },
  properties: {
    direction: 'row',
    displayAs: 'message'
  },
  ports: {
    default: {
      id: 'default',
      text: 'default',
      index: 0,
      properties: {}
    }
  }
};

const createNode = (data: any): any => {
    return {
      ...data,
      id: nanoid(10),
      output: {
        type: data.output.type,
        id: `${data.type}_${nanoid(10)}`
      }
    };
  };

export const availableNodes = [
    {
      id: 'MessageNode',
      title: 'Message',
      icon: 'BsChatFill',
      getNode: () => createNode(MessageNode)
    },
    {
      id: 'QuestionNode',
      title: 'Question',
      icon: 'BsQuestionCircleFill',
      getNode: () => createNode(QuestionNode)
    },
    {
      id: 'ButtonsNode',
      title: 'Choice',
      icon: 'BsMenuButtonWide',
      getNode: () => createNode(ButtonsNode)
    }
  ];
  