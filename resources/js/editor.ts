// @ts-ignore
import { IChartActions, IDmbtShape } from './editor/definitions';
import { FChart } from './editor/editor';
import { availableNodes } from './editor/availableNodes';
// @ts-ignore
import './editor/style.css';

let chart: IDmbtShape;
let actions: IChartActions;

if((window as any).DumbotInitData){
    runEditor((window as any).DumbotInitData);
}

function runEditor(initData) {
    const holderId = 'editorHolder';
    const holderElement = document.querySelector(`#${holderId}`) as HTMLDivElement;
    chart = JSON.parse(initData.draft);
    const published = JSON.parse(initData.schema)
    const props = {
        chart,
        width: '100%',
        height: '100%',
        availableNodes: availableNodes,
        // onNodeSettingsClick: (node: IDmbtNode) => {
        //   NodeEditor.createEditor(nodeEditorHolderId, {
        //     onSave: async (node: IDmbtNode) => {
        //       console.log('node modified', node);
        //       NodeEditor.dispose();
        //     },
        //     onCancel: () => {
        //       NodeEditor.dispose();
        //     },
        //     node,
        //     id: botId
        //   });
        // },
        //customNodeContentRenderer: CustomRenderer,
        // onCustomEditNode: (node: any) => {
        //   OpenNodeSettingsEditor(node, this.actions);
        // },
        onHistoryChange: (chart: IDmbtShape) => {
          chart = chart;
        },
        onLoad: (actionscb: IChartActions) => {
          actions = actionscb;
        },
        customTheme: {
          fontFamily: '"Figtree"',
          nodeHeadPadding: '6px'
        }
      };
      holderElement.innerHTML = '';
      FChart(props, holderId);
}