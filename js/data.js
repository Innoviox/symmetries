const data = { '#1-2-3-4': [[0, 0, 0, 0], [0, 0, 0]], '#1-2-34': [[1, 1, 1, 1], [2, 3, 0]], '#1-23-4': [[1, 0, 0, 1], [1, 0, 2]], '#1-234': [[0, 1, 0, 1], [1, 1, 0]], '#1-243': [[0, 1, 0, 1], [3, 0, 3]], '#1-24-3': [[1, 0, 0, 1], [2, 0, 1]], '#12-3-4': [[1, 1, 1, 1], [2, 1, 0]], '#12-34': [[0, 0, 0, 0], [0, 2, 0]], '#123-4': [[0, 1, 1, 0], [3, 0, 1]], '#1234': [[1, 0, 1, 0], [0, 0, 3]], '#1243': [[1, 0, 1, 0], [1, 0, 0]], '#124-3': [[0, 1, 1, 0], [3, 3, 0]], '#132-4': [[1, 1, 0, 0], [1, 3, 0]], '#1342': [[0, 1, 0, 1], [3, 0, 0]], '#13-2-4': [[0, 0, 1, 1], [2, 0, 3]], '#134-2': [[1, 0, 1, 0], [1, 0, 1]], '#13-24': [[1, 1, 1, 1], [0, 0, 2]], '#1324': [[0, 0, 0, 0], [0, 1, 0]], '#1432': [[0, 1, 0, 1], [0, 0, 1]], '#142-3': [[1, 1, 0, 0], [1, 0, 3]], '#143-2': [[1, 0, 1, 0], [3, 1, 0]], '#14-2-3': [[0, 0, 1, 1], [1, 2, 0]], '#1423': [[0, 0, 0, 0], [0, 3, 0]], '#14-23': [[1, 1, 1, 1], [2, 0, 0]] };

const rotation_table_text = `<p>
Another way to think of the symmetries of the cube is by "fixing" a face to be on top, and then rotating the cube for each face that can be in front. For each face on top, there are 4 options for face in front; 6 faces on top means this generates all 24 symmetries.
</p>
<p>Columns are the face "on top", rows are the face "in front" (from the default cube position, press "Reset Cube" to
  get back to the standard position).</p>
<p>
Greyed out squares are impossible based on the structure of the cube.
</p>
<table id="rotation-table">
  <tr>
    <td></td>
    <td>Blue</td>
    <td>Black</td>
    <td>Green</td>
    <td>Red</td>
    <td>Purple</td>
    <td>White</td>
  </tr>
  <tr>
    <td>Blue</td>
    <td class="grey"></td>
    <td>(1)(2)(3)(4)</td>
    <td>(1324)</td>
    <td>(1423)</td>
    <td class="grey"></td>
    <td>(12)(34)</td>
  </tr>
  <tr>
    <td>Black</td>
    <td>(14)(2)(3)</td>
    <td class="grey"></td>
    <td>(123)(4)</td>
    <td>(1)(243)</td>
    <td>(1342)</td>
    <td class="grey"></td>
  </tr>
  <tr>
    <td>Green</td>
    <td>(132)(4)</td>
    <td>(1234)</td>
    <td class="grey"></td>
    <td class="grey"></td>
    <td>(143)(2)</td>
    <td>(1)(24)(3)</td>
  </tr>
  <tr>
    <td>Red</td>
    <td>(1)(234)</td>
    <td>(1432)</td>
    <td class="grey"></td>
    <td class="grey"></td>
    <td>(124)(3)</td>
    <td>(13)(2)(4)</td>
  </tr>
  <tr>
    <td>Purple</td>
    <td class="grey"></td>
    <td>(13)(24)</td>
    <td>(1)(2)(34)</td>
    <td>(12)(3)(4)</td>
    <td class="grey"></td>
    <td>(14)(23)</td>
  </tr>
  <tr>
    <td>White</td>
    <td>(1243)</td>
    <td class="grey"></td>
    <td>(142)(3)</td>
    <td>(134)(2)</td>
    <td>(1)(23)(4)</td>
    <td class="grey"></td>
  </tr> </table>`;
export { data, rotation_table_text };