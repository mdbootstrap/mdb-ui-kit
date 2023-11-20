import Manipulator from '../../mdb/dom/manipulator';
import SelectorEngine from '../../mdb/dom/selector-engine';
import DEFAULT_OPTIONS from '../../pro/charts/chartsDefaults';

const chartsCallback = (Component, initSelector) => {
  // eslint-disable-next-line consistent-return
  const IS_COMPLEX = (data) => {
    return (
      (data[0] === '{' && data[data.length - 1] === '}') ||
      (data[0] === '[' && data[data.length - 1] === ']')
    );
  };

  const CONVERT_DATA_TYPE = (data) => {
    if (typeof data !== 'string') return data;
    if (IS_COMPLEX(data)) {
      return JSON.parse(data.replace(/'/g, '"'));
    }
    return data;
  };

  const PARSE_DATA = (data) => {
    const dataset = {};
    Object.keys(data).forEach((property) => {
      if (property.match(/dataset.*/)) {
        const chartProperty = property.slice(7, 8).toLowerCase().concat(property.slice(8));
        dataset[chartProperty] = CONVERT_DATA_TYPE(data[property]);
      }
    });
    return dataset;
  };

  SelectorEngine.find(initSelector).forEach((el) => {
    if (
      !Component.getInstance(el) &&
      Manipulator.getDataAttribute(el, 'chart') !== 'bubble' &&
      Manipulator.getDataAttribute(el, 'chart') !== 'scatter'
    ) {
      const dataSet = Manipulator.getDataAttributes(el);
      const dataAttr = {
        data: {
          datasets: [PARSE_DATA(dataSet)],
        },
      };
      if (dataSet.chart) {
        dataAttr.type = dataSet.chart;
      }
      if (dataSet.labels) {
        dataAttr.data.labels = JSON.parse(dataSet.labels.replace(/'/g, '"'));
      }

      return new Component(el, {
        ...dataAttr,
        ...DEFAULT_OPTIONS[dataAttr.type],
      });
    }
    return null;
  });
};

export default chartsCallback;
