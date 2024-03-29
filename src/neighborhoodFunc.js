// @flow
import { euclideanDistance } from './euclideanDistance';
/**
<p>
The \( \alpha(t) \) returns the learning rate at time \( t \). The \( \alpha(t) \)  is a decreasing function of time which returns values between \( [0,1] \) (decreases from 1 to 0). \( \alpha(t) \) should be monotonically (e.g., hyperbolically, exponentially, or piecewise linearly) decrease function of \( t \). <a title="Kohonen, T. (2013). Essentials of the self-organizing map. Neural Networks, 37, 52–65. http://doi.org/10.1016/j.neunet.2012.09.018">(Kohonen, 2012)</a>
</p>

In r_somap, for stepwise recursive version of SOM, the linearly function

<span>
\[ \alpha(t) = rate_{0} - t / T \]
</span>

<p>
is used. Where \( rate_{0} \) is the initial rate, and \( T \) is the total numbers of epochs. \( rate_{0} \) has a default value of 0.5 since this was <a href="http://www.cis.hut.fi/somtoolbox/documentation/somalg.shtml">suggested by SOM Toolbox </a>
</p>

 **/
export const alpha = (
  t: number,
  numberOfEpochs: number,
  initRate?: number = 0.5,
  // type: string = 'linear',
  // options: {
  //   initRate: number,
  //   finalRate: number,
  // } = {
  //   initRate: 0.5,
  //   finalRate: 0,
  // },
): number => {
  const a = initRate - t / numberOfEpochs;
  return a;
  // if (type === 'power-series') {
  //   const { initRate, finalRate } = options;
  //   return initRate * (finalRate / initRate) ** (t / numberOfEpochs);
  // }
  // if (type === 'inverse-of-time') {
  //   const b = numberOfEpochs / 100;
  //   return a / (b + t);
  // }
};

/**
<p>
The \( \sigma(t) \) function returns the neighborhood radius at time  \( t \), an decreasing function of t. The \( \sigma(t) \) should be monotonically (e.g., hyperbolically, exponentially, or piecewise linearly). <a title="Kohonen, T. (2013). Essentials of the self-organizing map. Neural Networks, 37, 52–65. http://doi.org/10.1016/j.neunet.2012.09.018">(Kohonen, 2012)</a>
</p>

<p>
In r_somap, the default is a linear function
</p>

<span>
\[ \sigma(t) = (radius_{0} - radius_{T}) * (T - t) / T \]
</span>

<p>
returns series of values from given initial radius to given final radius. Where \( radius_{0} \) is the initial radius, and \( radius_{T} \) is the final radius.
\(  (T - t) / T \) is the fraction of \( t \) in \( T \) ( the total numbers of epochs).</p>

<p>
The final radius has a default that is \( \frac{\sqrt{1}}{2} \) since the "map spacing" or the padding of nodes in the hexagonal map in r_somap is \( \sqrt{1} \). The final radius should be pre-defined since "The final value of \( \sigma(t) \)  shall not go to zero, because otherwise the process loses its ordering power. It should always remain, say, above half of the map spacing."<a title="Kohonen, T. (2013). Essentials of the self-organizing map. Neural Networks, 37, 52–65. http://doi.org/10.1016/j.neunet.2012.09.018">(Kohonen, 2012)</a>
</p>

**/
export const sigma = (
  t: number,
  numberOfEpochs: number,
  initRadius: number,
  finalRadius?: number = Math.sqrt(1) / 2,
): number => {
  if (t === 0) {
    return initRadius;
  }
  const d = initRadius - finalRadius;
  return d * (numberOfEpochs - t) / numberOfEpochs;
};

/**
<p>
The \( h_{ci}(t) \), or the neighborhood function. The rates of the modifications \( x(t) - m_{i}(t) \) at different nodes \( m_{i} \) depend on the mathematical form of the  \( h_{ci}(t) \). Where \( c \) is the index of best matching node on map and \( i \) is the index of node in the map.

<span>
\[ m_{i}(t+1) = m_{i}(t) + h_{ci}(t)[x(t) - m_{i}(t)] \]
</span>

In r_somap, the neighborhood function h(t) is

<span>
\[ h_{ci}(t) = \alpha(t)\exp [-dist^{2}(c,i)/2\sigma^{2}(t)] \]
</span>

which is a Gaussian neighborhood function, the same as much applied choice. <a title="Kohonen, T. (2013). Essentials of the self-organizing map. Neural Networks, 37, 52–65. http://doi.org/10.1016/j.neunet.2012.09.018">(Kohonen, 2012)</a>
</p>

<p>
The \( \alpha(t) \) is the learning rate function and \( \sigma(t) \) is the neighborhood radius function. \( dist^{2}(c,i) \) is the square of the geometric distance between the best matching node \( c \) and \( i \) is the index of node in the map.
</p>
 **/
export const h = (
  t: number,
  numberOfEpochs: number,
  coordinationOfBMU: Array<number>,
  coordinationOfMapUnit: Array<number>,
  initRadius: number,
): number => {
  const rate = alpha(t, numberOfEpochs);
  const radius = sigma(t, numberOfEpochs, initRadius);
  const dist = euclideanDistance(coordinationOfBMU, coordinationOfMapUnit);
  const sqDist = dist * dist;
  return rate * Math.exp(-sqDist / (2 * radius * radius));
};
