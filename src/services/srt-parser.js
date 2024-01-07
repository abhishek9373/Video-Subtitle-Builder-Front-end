
const parseSrt = (srtContent) =>{
    const lines = srtContent.split('\n');
    let subtitles = [];
  
    for (let i = 0; i < lines.length; i++) {
      // Skip empty lines
      if (lines[i].trim() === '') continue;
  
      // Parse subtitle number
      const number = parseInt(lines[i], 10);
  
      // Move to the next line
      i++;
  
      // Parse time format (HH:mm:ss --> HH:mm:ss)
      const [startTime, endTime] = lines[i].split(' --> ');
  
      // Move to the next line
      i++;
  
      // Parse subtitle text
      let text = lines[i];
  
      // Move to the next line
      i++;
  
      // Handle multiline subtitles
      while (lines[i] && lines[i].trim() !== '') {
        text += `\n${lines[i]}`;
        i++;
      }
  
      // Add subtitle to the array
      subtitles.push({
        number: number,
        start: startTime,
        end: endTime,
        text: text,
      });
    }
    return subtitles;
}

export default parseSrt;