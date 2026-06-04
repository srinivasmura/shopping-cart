import React from 'react'

const SamplePage = () => {

  function fn() {
    return
    { name: "Srinivas" }
  }
  console.log(fn())

  const arr = [10, 12, 18, 6, 4]// need to some 2 number and output should be 30
  function findIndex() {
    let output = []
    for (let i = 0; i < arr.length; i++)
      console.log(arr[i])
    console.log(arr[i + 1])
    if (arr[i] === arr[i + 1] === 30) {
      output = [i, i + 1]
    }
  }

  return (
    <div>
      <h1>This is Sample Page</h1>
    </div>
  )
}

export default SamplePage
