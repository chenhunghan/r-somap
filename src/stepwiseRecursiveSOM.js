// @flow
import { train } from './train';
import { createMap } from './createMap';
/**
* The original, classical or stepwise recursive SOM algorithm.
*
<p>
At time \( t \), one sample vector \( x(t) \) from input data set is selected. By comparing the selected sample vector \( x(t) \) and all map units \( m_{i} \) on the map. One map unit \( m_{c} \) will be the "winner", or the best matching unit(BMU). The selection of BMU is eleborated in section <a href="#findBMU">findBMU function</a>.

After the BMU \( m_{c} \) has been identified, all \( m_{i} \) will be modified. The modification  depends on the mathematical form of the neighborhood function \( h_{ci}(t) \). Which is eleborated in section <a href="#h">h, the neighborhood function</a>. The modification is
</p>

<span>
\[ m_{i}(t+1) = m_{i}(t) + h_{ci}(t)[x(t) - m_{i}(t)] \]
</span>

<p>
The rates of the modifications \( x(t) - m_{i}(t) \) at different nodes \( m_{i} \) depend on the \( h_{ci}(t) \). Where \( c \) is the best matching unit on map and \( i \) is the index of node in the map.
<p>

The step wise recursive SOM will reiterated the modifications for given epochs.

<span>
\[ \sum_t{m_{i}(t+1)} = \sum_t{m_{i}(t)} + \sum_t{h_{ci}(t)[x(t) - m_{i}(t)]} \]
</span>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css" integrity="sha384-wITovz90syo1dJWVh32uuETPVEtGigN07tkttEqPv+uR2SE/mbQcG7ATL28aI9H0" crossorigin="anonymous">
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js" integrity="sha384-/y1Nn9+QQAipbNQWU65krzJralCnuOasHncUFXGkdwntGeSvQicrYkiUBwsgUqc1" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/contrib/auto-render.min.js" integrity="sha384-dq1/gEHSxPZQ7DdrM82ID4YVol9BYyU7GbWlIwnwyPzotpoc57wDw/guX8EaYGPx" crossorigin="anonymous">
</script>
<script>
  document.addEventListener("DOMContentLoaded", function() {
    renderMathInElement(document.body);
  });
</script>

* @param inputDataSet - the input data set.
* @param mapSize - the size of the map, i.e., the gird. Default = 5 * Math.sqrt(inputDataSet.length) as suggested by SOM Toolbox; Kohonen (2012) claims "It is not possible to guess or estimate the exact size of the array beforehand. It must be determined by the trial-and-error method, after seeing the quality of the first guess.
* @param widthOfSOMap - Default is 1.5 * height of map suggested by SOM Toolbox
* @returns trainedMap - the map that has been trained base on the input data set.
**/
export const stepwiseRecursiveSOM = (
  inputDataSet: Array<Array<number>>,
  mapSize?: number = Math.max(150, Math.round(5 * Math.sqrt(inputDataSet.length))),
  initRadius?: number = Math.sqrt(mapSize) / 2,
  numberOfEpochs?: number = 10 * mapSize, // at least 10 * mapSize suggested by SOM Toolbox
  neighborhoodFunc?: Function,
  widthOfSOMap?: number = Math.round(Math.sqrt(mapSize / 1.5) * 1.5),
  initMap?: Array<Array<number>> = createMap(
    widthOfSOMap,
    Math.ceil(mapSize / widthOfSOMap),
    inputDataSet[0].length,
  ),
): Array<Array<number>> => {
  const epochs = Array.from({ length: numberOfEpochs }, (v, i) => i);
  return epochs.reduce(((accumulatingMapWithTime, t) =>
          inputDataSet.reduce((accumulatingMap, sampleVector) =>
            train(
              accumulatingMap,
              widthOfSOMap,
              sampleVector,
              t,
              numberOfEpochs,
              initRadius,
              neighborhoodFunc,
            ).SOMap,
          accumulatingMapWithTime)),
          initMap);
};
