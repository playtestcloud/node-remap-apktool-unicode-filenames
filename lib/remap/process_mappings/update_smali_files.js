const replace = require('replace-in-file')

function chunk(array, size) {
  const chunked_arr = []
  let copied = [...array] // ES6 destructuring
  const numOfChild = Math.ceil(copied.length / size) // Round up to the nearest integer
  for (let i = 0; i < numOfChild; i++) {
    chunked_arr.push(copied.splice(0, size))
  }
  return chunked_arr
}

const update_smali_files = async (smali_dirs_data) => {
  const file_chunks = chunk(smali_dirs_data.files, 100)
  from_regexp = smali_dirs_data.mappings.map(replacement => new RegExp(replacement.old.classname, 'g'))
  to_regexp = smali_dirs_data.mappings.map(replacement => replacement.new.classname)

  try {
    file_chunks.forEach( (files, i) => {
      console.log(`Processing batch ${i}`)
      replace.sync({
        files: files,
        from: from_regexp,
        to: to_regexp,
      })
    })
  }
  catch (error) {
    console.error('Error occurred:', error);
  }
}

module.exports = update_smali_files
