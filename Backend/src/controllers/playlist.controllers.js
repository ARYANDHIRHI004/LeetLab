import { db } from "../libs/db.js";

export const getAllListDetails = async (req, res) => {
  const userId = req.user.id;
  try {
    const playLists = await db.playlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        problems: {
          include: {
            problems: true,
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "playlist fetched successfully",
      playLists,
    });
  } catch (error) {
    console.error("Error", error);
  }
};

export const getPlayListDetails = async (req, res) => {
  const { playlistId } = req.params;
  const userId = req.user.id;

  try {
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId,
      },
      include: {
        problems: {
          include: {
            problems: {
              include: {
                description: false,
                tags: false,
                examples: false,
                constraints: false,
                hints: false,
                editoral: false,
                testcases: false,
                codeSnippets: false,
                refrenceSolution: false,
              },
            },
          },
        },
        assignedTo: {
          include: {
            user: {
              include: {
                password: false,
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Playlist found successfully",
      playlist,
    });
  } catch (error) {}
};

export const createPlaylist = async (req, res) => {
  const { name, description, eventDate, eventTime, endDate, endTime, mode } = req.body;
  const userId = req.user.id;


  try {
    if (!name || !description) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    let playList;

    if (req.user.role === "ORGANIZATION") {
      playList = await db.Playlist.create({
        data: {
          name,
          description,
          userId,
          eventDate,
          eventTime,
          endDate,
          endTime,
          mode,
        },
      });
    }

    if(req.user.role !== "ORGANIZATION"){
      playList = await db.Playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });
    }

    if (!playList) {
      return res.status(400).json({
        message: "not created",
      });
    }

    res.status(200).json({
      success: true,
      message: "Playlist created successfully",
      playList,
    });
  } catch (error) {
    console.error("Error", error);
  }
};

export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  console.log(problemIds);

  try {
    // Ensure problemIds is an array
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: "Invalid or missing problemIds" });
    }

    // Create records for each problem in the playlist
    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playListId: playlistId,
        problemId,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Problems added to playlist successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    console.error("Error adding problems to playlist:", error.message);
    res.status(500).json({ error: "Failed to add problems to playlist" });
  }
};

export const deletePlaylist = async (req, res) => {
  const userId = req.user.id;
  const { playlistId } = req.params;
  
  try {
    const deleted = await db.playlist.delete({
      where: {
        id:playlistId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      deleted,
    });
  } catch (error) {
    console.error("error", error);
  }
};

export const removeProblemsFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
    }
  } catch (error) {}
};

export const UpdateIsActiveOfPlaylist = async (req, res) => {
  const userId = req.user.id;
  const { isActive, mode } = req.body;

  try {
    if (req.user.role !== "ORGANIZATON") {
      return res.status(401).json({
        message: "Unauthorized Request",
      });
    }
    let updatedIsActive
    
    if (!isActive) {
       updatedIsActive = await db.Playlist.update({
        where: {
          userId,
        },
        data: {
          mode,
        },
      });
    }
    if (!mode) {
      updatedIsActive = await db.Playlist.update({
        where: {
          userId,
        },
        data: {
          isActive,
        },
      });
    }

    return res.status(200).json({
      message: "modefied successfully"
    })
  } catch (error) {
    console.log("error", error);
  }
};

// export const getPlaylistByCreationDate = async (req, res) => {
//   const userId = req.user.id;
//   const { isActive, mode } = req.body;

//   try {
    

//     return res.status(200).json({
//       message: "modefied successfully"
//     })
//   } catch (error) {
//     console.log("error", error);
//   }
// };
