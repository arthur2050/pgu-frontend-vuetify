function getValue (object, path, defaultValue = undefined) {
  const result = path.split('.').reduce((previous, current) => {
    return (previous === undefined) ? undefined : previous[current];
  }, object);
  return result === undefined ? defaultValue : result;
}

export {getValue};
