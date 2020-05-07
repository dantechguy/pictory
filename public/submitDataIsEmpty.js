function submitDataIsEmpty() {
  if (state === values.state.DRAW) {
    return submitData === values.defaultData.draw;
  } else if (state === values.state.IDEA || state === values.state.GUESS) {
    return submitData === values.defaultData.text;
  }
}
