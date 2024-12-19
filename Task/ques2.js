function lengthOfLongestSubstring(s) {
    let maxLength = 0;
    let seen = new Set(); 
    let left = 0; 

    for (let right = 0; right < s.length; right++) {
        // Remove characters until there are no duplicates
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        // Add the current character to the set
        seen.add(s[right]);
        // Update the maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}


console.log(lengthOfLongestSubstring("AAA")); // Output: 1
