function lengthOfLongestSubstring(s) {
    let maxLength = 0;                          
    let start = 0;                               
    let seen = new Map();                 

    for (let end = 0; end < s.length; end++) {
        // Check if the current character is already seen
        if (seen.has(s[end]) && seen.get(s[end]) >= start) {
            // Move the start to one position after the last occurrence
            start = seen.get(s[end]) + 1;
        }

        // Update the character's last seen index
        seen.set(s[end], end);

        // Calculate the current substring length and update maxLength
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}


console.log(lengthOfLongestSubstring("ABCBC"));     // Output: 3
