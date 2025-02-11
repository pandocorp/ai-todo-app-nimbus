import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Constants from "../constants";

//Get Tasks function
export const GetTasksFunction = createAsyncThunk(
    "homePage/GetTasksFunction",async (credentials) => {
        try{
            const response = await fetch(Constants.Api.commonurl+'get_tasks/'+credentials.token+'/'+credentials.getPendingTasks,{
                method : 'GET'
            })
            const data = await response.json()
            return data
        }
        catch(err){
            return err
        }
    }
)

//Get Taskss function
export const GetTaskFunction = createAsyncThunk(
    "homePage/GetTaskFunction",async (credentials) => {
        try{
            const response = await fetch(Constants.Api.commonurl+'get_task/'+credentials.taskId,{
                method : 'GET'
            })
            const data = await response.json()
            return data
        }
        catch(err){
            return err
        }
    }
)

//Update Task function
export const UpdateTaskFunction = createAsyncThunk(
    "homePage/UpdateTaskFunction",async (credentials) => {
        const taskId = credentials.credentials._id;
        if (credentials.credentials && Object.keys(credentials.credentials).length) {
            delete credentials.credentials._id;
        }
        try{
            const response = await fetch(Constants.Api.commonurl+'update_task/'+taskId,{
                method : 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Ensure the server understands the data format
                },
                body: JSON.stringify(credentials.credentials),
            })
            const data = await response.json()
            return data
        }
        catch(err){
            return err
        }
    }
)

//Update Task function
export const GetUserFunction = createAsyncThunk(
    "homePage/GetUserFunction",async (credentials) => {
        try{
            const response = await fetch(Constants.Api.commonurl+'get_user/'+credentials.token,{
                method : 'GET'
            })
            const data = await response.json()
            return data
        }
        catch(err){
            return err
        }
    }
)

//Create Company function
export const CreateCompanyFunction = createAsyncThunk(
    "homePage/CreateCompanyFunction",async (credentials, body) => {
        try{
            const response = await fetch(Constants.Api.commonurl+'create_company',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure the server understands the data format
                },
                body: JSON.stringify(body),
            })
            const data = await response.json()
            return data
        }
        catch(err){
            return err
        }
    }
)

//Create User function
export const CreateUserFunction = createAsyncThunk(
    "homePage/CreateUserFunction",async (credentials, body) => {
        try{
            const response = await fetch(Constants.Api.commonurl+'create_user',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure the server understands the data format
                },
                body: JSON.stringify(body),
            })
            const data = await response.json()
            return data
        }
        catch(err){
            return err
        }
    }
)

//Create Task function
export const CreateTaskFunction = createAsyncThunk(
    "homePage/CreateTaskFunction", async (body) => {
        try{
            const response = await fetch(Constants.Api.commonurl+'create_task',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure the server understands the data format
                },
                body: JSON.stringify(body.body),
            })
            const data = await response.json()
            return data
        }
        catch(err){
            return err
        }
    }
)

// Chat bot function
export const GetChatInformation = createAsyncThunk(
    "homePage/GetChatInformation", async (body) => {
        try {
            const response = await fetch(Constants.Api.commonurl+'ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(body.body)
            })
            const data = await response.json()
            return data;
        } catch (err) {
            return err;
        }
    }
)

export const GetSubTasks = createAsyncThunk(
    "homePage/GetSubTasks", async (credentials) => {
        try {
            const response = await fetch(Constants.Api.commonurl+'get_sub_tasks/'+credentials.taskId, {
                method: 'GET'
            })
            const data = await response.json()
            return data;
        } catch (err) {
            return err;
        }
    }
)

export const UpdateSubTasks = createAsyncThunk(
    "homePage/UpdateSubTasks", async (credentials) => {
        try {
            const response = await fetch(Constants.Api.commonurl+'update_sub_task/'+credentials.taskId, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(credentials.body)
            })
            const data = await response.json();
            return data;
        } catch (err) {
            return err;
        }
    }
)

export const GetScheduleFunction = createAsyncThunk(
    "homePage/GetScheduleFunction", async (credentials) => {
        try {
            const response = await fetch(Constants.Api.commonurl+'get_schedule/'+localStorage.getItem('mailId'), {
                method: 'GET',
            })
            const data = await response.json();
            return data;
        } catch (err) {
            return err;
        }
    }
)

export const GenerateMetricsFunction = createAsyncThunk(
    "homePage/GenerateMetricsFunction", async (credentials) => {
        try {
            const response = await fetch(Constants.Api.commonurl+'ai/generate_metrics', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(credentials.body)
            })
            const data = await response.json();
            return data
        } catch (err) {
            return err;
        }
    }
)

export const AiRescheduleFunction = createAsyncThunk(
    "homePage/AiRescheduleFunction", async (credentials) => {
        try {
            const response = await fetch(Constants.Api.commonurl+'ai/reschedule', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(credentials.body)
            })
            const data = await response.json();
            return data;
        } catch (err) {
            return err;
        }
    }
)

export const UpdateUserFunction = createAsyncThunk(
    "homePage/UpdateUserFunction", async (credentials) => {
        try {
            const response = await fetch(Constants.Api.commonurl+'update_user/'+localStorage.getItem('mailId'), {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(credentials.body)
            })
            const data = await response.json();
            return data;
        } catch (err) {
            return err;
        }
    }
)

export const GetTextToVoice = createAsyncThunk(
    "homePage/GetTextToVoice", async (credentials) => {
        try {
            const response = await fetch(Constants.Api.commonurl+'ai/txt_to_voice/'+localStorage.getItem('mailId'), {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
            })
            const data = await response.json();
            return data;
        } catch (err) {
            return err;
        }
    }
)

const initialState = {
    tasksLoader: false,
    individualTaskLoader: false,
    updateTaskLoader: false,
    getUserLoader: false,
    createCompanyLoader: false,
    createUserLoader: false,
    createTaskLoader: false,
    chatInformationLoader: false,
    getSubTasksLoader: false,
    updateSubTasksLoader: false,
    scheduleLoader: false,
    generateMetricsLoader: false,
    rescheduleLoader: false,
    updateUserLoader: false,
    getTextVoice: false
}

const HomePageSlice = createSlice({
    name : 'homepage',
    initialState,
    reducers : {
        // setClientId: (state, action) => {
        //     state.clientId = action.payload
        // },
    },
    extraReducers: (builder) => {
        builder
          // GetTasksFunction
          .addCase(GetTasksFunction.pending, (state, action) => {
            state.tasksLoader = true;
          })
          .addCase(GetTasksFunction.fulfilled, (state, action) => {
            state.tasksLoader = false;
          })
          .addCase(GetTasksFunction.rejected, (state, action) => {
            state.tasksLoader = false;
          })
    
          // GetTaskFunction
          .addCase(GetTaskFunction.pending, (state, action) => {})
          .addCase(GetTaskFunction.fulfilled, (state, action) => {})
          .addCase(GetTaskFunction.rejected, (state, action) => {})
    
          // UpdateTaskFunction
          .addCase(UpdateTaskFunction.pending, (state, action) => {
            state.updateTaskLoader = true;
          })
          .addCase(UpdateTaskFunction.fulfilled, (state, action) => {
            state.updateTaskLoader = false;
          })
          .addCase(UpdateTaskFunction.rejected, (state, action) => {
            state.updateTaskLoader = false;
          })
    
          // GetUserFunction
          .addCase(GetUserFunction.pending, (state, action) => {
            state.getUserLoader = true;
          })
          .addCase(GetUserFunction.fulfilled, (state, action) => {
            state.getUserLoader = false;
          })
          .addCase(GetUserFunction.rejected, (state, action) => {
            state.getUserLoader = false;
          })
    
          // CreateCompanyFunction
          .addCase(CreateCompanyFunction.pending, (state, action) => {
            state.createCompanyLoader = true;
          })
          .addCase(CreateCompanyFunction.fulfilled, (state, action) => {
            state.createCompanyLoader = false;
          })
          .addCase(CreateCompanyFunction.rejected, (state, action) => {
            state.createCompanyLoader = false;
          })
    
          // CreateUserFunction
          .addCase(CreateUserFunction.pending, (state, action) => {
            state.createUserLoader = true;
          })
          .addCase(CreateUserFunction.fulfilled, (state, action) => {
            state.createUserLoader = false;
          })
          .addCase(CreateUserFunction.rejected, (state, action) => {
            state.createUserLoader = false;
          })
    
          // CreateTaskFunction
          .addCase(CreateTaskFunction.pending, (state, action) => {
            state.createTaskLoader = true;
          })
          .addCase(CreateTaskFunction.fulfilled, (state, action) => {
            state.createTaskLoader = false;
          })
          .addCase(CreateTaskFunction.rejected, (state, action) => {
            state.createTaskLoader = false;
          })

            // CreateTaskFunction
            .addCase(GetChatInformation.pending, (state, action) => {
                state.chatInformationLoader = true;
                })
                .addCase(GetChatInformation.fulfilled, (state, action) => {
                state.chatInformationLoader = false;
                })
                .addCase(GetChatInformation.rejected, (state, action) => {
                state.chatInformationLoader = false;
                })

                // CreateTaskFunction
            .addCase(GetSubTasks.pending, (state, action) => {
                state.getSubTasksLoader = true;
                })
                .addCase(GetSubTasks.fulfilled, (state, action) => {
                state.getSubTasksLoader = false;
                })
                .addCase(GetSubTasks.rejected, (state, action) => {
                state.getSubTasksLoader = false;
                })

                // CreateTaskFunction
            .addCase(UpdateSubTasks.pending, (state, action) => {
                state.updateSubTasksLoader = true;
                })
                .addCase(UpdateSubTasks.fulfilled, (state, action) => {
                state.updateSubTasksLoader = false;
                })
                .addCase(UpdateSubTasks.rejected, (state, action) => {
                state.updateSubTasksLoader = false;
                })

                // CreateTaskFunction
            .addCase(GetScheduleFunction.pending, (state, action) => {
                state.scheduleLoader = true;
                })
                .addCase(GetScheduleFunction.fulfilled, (state, action) => {
                state.scheduleLoader = false;
                })
                .addCase(GetScheduleFunction.rejected, (state, action) => {
                state.scheduleLoader = false;
                })

                // CreateTaskFunction
            .addCase(GenerateMetricsFunction.pending, (state, action) => {
                state.generateMetricsLoader = true;
                })
                .addCase(GenerateMetricsFunction.fulfilled, (state, action) => {
                state.generateMetricsLoader = false;
                })
                .addCase(GenerateMetricsFunction.rejected, (state, action) => {
                state.generateMetricsLoader = false;
                })

                // CreateTaskFunction
            .addCase(AiRescheduleFunction.pending, (state, action) => {
                state.rescheduleLoader = true;
                })
                .addCase(AiRescheduleFunction.fulfilled, (state, action) => {
                state.rescheduleLoader = false;
                })
                .addCase(AiRescheduleFunction.rejected, (state, action) => {
                state.rescheduleLoader = false;
                })

                // CreateTaskFunction
            .addCase(UpdateUserFunction.pending, (state, action) => {
                state.updateUserLoader = true;
                })
                .addCase(UpdateUserFunction.fulfilled, (state, action) => {
                state.updateUserLoader = false;
                })
                .addCase(UpdateUserFunction.rejected, (state, action) => {
                state.updateUserLoader = false;
                })

                .addCase(GetTextToVoice.pending, (state, action) => {
                    state.getTextVoice = true;
                    })
                    .addCase(GetTextToVoice.fulfilled, (state, action) => {
                    state.getTextVoice = false;
                    })
                    .addCase(GetTextToVoice.rejected, (state, action) => {
                    state.getTextVoice = false;
                    })
      },
})

// eslint-disable-next-line no-empty-pattern
export const {} = HomePageSlice.actions
export default HomePageSlice.reducer 