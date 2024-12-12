
export const parseUserName = (userName: string): { id: string; name: string } => {
    const lastSpaceIndex = userName.lastIndexOf(' ');
  
    return {
      id: lastSpaceIndex !== -1 ? userName.substring(lastSpaceIndex + 1) : '',
      name: lastSpaceIndex !== -1 ? userName.substring(0, lastSpaceIndex) : userName,
    };
  };