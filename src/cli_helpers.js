function parseArgs() {
  const args = process.argv.slice(2);
  let contextPath = null;
  let jobDescriptionPath = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--context' && args[i + 1]) {
      contextPath = path.resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--job-description' && args[i + 1]) {
      jobDescriptionPath = path.resolve(args[i + 1]);
      i++;
    }
  }
  return [contextPath, jobDescriptionPath];
}

export {
    parseArgs
}