

export function formatDate(dateString){

    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date string');
    }

    // Define options for formatting
    const options = {
        month: 'short', // Short month name (e.g., Jan, Feb)
        day: '2-digit', // 2-digit day (e.g., 01, 02)
        hour: '2-digit', // 2-digit hour (e.g., 01, 02)
        hour12: true // 12-hour clock format (use false for 24-hour format)
    };

    // Format the date
    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate;
}


