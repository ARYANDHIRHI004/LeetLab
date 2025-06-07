import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
  CloudSunRain,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { useProblemStore } from "../Store/useProblemStore";

const CreateProblem = () => {
  const { handleSubmit, register, control, reset } = useForm();
  const navigation = useNavigate();
  const {createProblem, isCreating} = useProblemStore()

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCases,
  } = useFieldArray({
    control,
    name: "testCases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const submitForm = (data) => {
    console.log(data);
    createProblem(data)
  };

  return (
    <div className=" crate-problem-page h-screen bg-[#111111] pt-19 text-white overflow-auto pb-20">
      <h1 className="text-white text-[23px] text-center">Create Problem</h1>
      <div className="flex justify-center">
         <form
          className="text-[15px]  w-[86vw] md:w-[50vw]"
          action={handleSubmit(submitForm)}
        >
          <div className="flex flex-col mb-5">
            <label className="text-[17px]" htmlFor="">
              Title :
            </label>
            <input
              {...register("title")}
              className="bg-white text-black rounded-[5px] "
              type="text"
            />
          </div>
          <div className="flex flex-col mb-5">
            <label className="text-[17px]" htmlFor="">
              Description :
            </label>
            <textarea
              {...register("description")}
              className="bg-white text-black  resize-y rounded-[5px]"
              type="text"
            />
          </div>

          <div className="flex flex-col mb-5">
            <label className="text-[17px]" htmlFor="">
              difficulty :
            </label>
            <select
              {...register("difficulty")}
              className="bg-white text-black  rounded-[5px] "
              type="text"
            >
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>

          <div className="card bg-base-200 p-4 md:p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                Tags
              </h3>
              <button
                type="button"
                className=" rounded-[5px] w-10"
                onClick={() => appendTag("")}
              >+</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tagFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                     className="bg-white text-black rounded-[5px] px-2 w-[13vw]"
                    {...register(`tags.${index}`)}
                    placeholder="Enter tag"
                  />
                  <button
                    type="button"
                     className="rounded-[5px] w-10"
                    onClick={() => removeTag(index)}
                    disabled={tagFields.length === 1}
                  >X</button>
                </div>
              ))}
            </div>
            
          </div>

          <div className="card bg-base-200 p-4 md:p-6 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Test Cases
              </h3>
              <button
                type="button"
                 className=" rounded-[5px] text-center flex flex-col p-2"
                onClick={() => appendTestCase({ input: "", output: "" })}
              >
                + <span>Add Test Case</span>
              </button>
            </div>
            <div className="space-y-6">
              {testCaseFields.map((field, index) => (
                <div key={field.id} className="card bg-base-100 shadow-md">
                  <div className="card-body p-4 md:p-6">
                    <div className="flex justify-between items-center mb-4 ">
                      <h4 className="text-base md:text-lg font-semibold">
                        Test Case #{index + 1}
                      </h4>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => removeTestCase(index)}
                        disabled={testCaseFields.length === 1}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">Input</span>
                        </label>
                        <textarea
                          className=" bg-white text-black rounded-[5px] min-h-24 w-full p-3 resize-y"
                          {...register(`testCases.${index}.input`)}
                          placeholder="Enter test case input"
                        />
                        
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text font-medium">
                            Expected Output
                          </span>
                        </label>
                        <textarea
                          className=" bg-white text-black rounded-[5px]  min-h-24 w-full p-3 resize-y"
                          {...register(`testCases.${index}.output`)}
                          placeholder="Enter expected output"
                        />
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
           
          </div>

          <div className="space-y-8">
            {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
              <div
                key={language}
                className="card bg-base-200 p-4 md:p-6 shadow-md"
              >
                <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  {language}
                </h3>

                <div className="space-y-6">
                  {/* Starter Code */}
                  <div className="card bg-base-100 shadow-md">
                    <div className="card-body p-4 md:p-6">
                      <h4 className="font-semibold text-base md:text-lg mb-4">
                        Starter Code Template
                      </h4>
                      <div className="border rounded-md overflow-hidden">
                        <Controller
                          name={`codeSnippets.${language}`}
                          control={control}
                          render={({ field }) => (
                            <Editor
                              height="300px"
                              language={language.toLowerCase()}
                              theme="vs-dark"
                              value={field.value}
                              onChange={field.onChange}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: "on",
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                              }}
                            />
                          )}
                        />
                      </div>
                      
                    </div>
                  </div>

                  {/* Reference Solution */}
                  <div className="card bg-base-100 shadow-md">
                    <div className="card-body p-4 md:p-6">
                      <h4 className="font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        Reference Solution
                      </h4>
                      <div className="border rounded-md overflow-hidden">
                        <Controller
                          name={`referenceSolutions.${language}`}
                          control={control}
                          render={({ field }) => (
                            <Editor
                              height="300px"
                              language={language.toLowerCase()}
                              theme="vs-dark"
                              value={field.value}
                              onChange={field.onChange}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                lineNumbers: "on",
                                roundedSelection: false,
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                              }}
                            />
                          )}
                        />
                      </div>
                      
                    </div>
                  </div>

                  {/* Examples */}
                  <div className="card bg-base-100 shadow-md">
                    <div className="card-body p-4 md:p-6">
                      <h4 className="font-semibold text-base md:text-lg mb-4">
                        Example
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">
                              Input
                            </span>
                          </label>
                          <textarea
                            className="bg-white text-black rounded-[5px] min-h-20 w-full p-3 resize-y"
                            {...register(`examples.${language}.input`)}
                            placeholder="Example input"
                          />
                          
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text font-medium">
                              Output
                            </span>
                          </label>
                          <textarea
                            className="bg-white text-black rounded-[5px] min-h-20 w-full p-3 resize-y"
                            {...register(`examples.${language}.output`)}
                            placeholder="Example output"
                          />
                          
                        </div>
                        <div className="form-control md:col-span-2">
                          <label className="label">
                            <span className="label-text font-medium">
                              Explanation
                            </span>
                          </label>
                          <textarea
                            className="bg-white text-black rounded-[5px] min-h-24 w-full p-3 resize-y"
                            {...register(`examples.${language}.explanation`)}
                            placeholder="Explain the example"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card bg-base-200 p-4 md:p-6 shadow-md">
            <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-warning" />
              Additional Information
            </h3>
            <div className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Constraints</span>
                </label>
                <textarea
                  className="bg-white text-black rounded-[5px] min-h-24 w-full p-3 resize-y"
                  {...register("constraints")}
                  placeholder="Enter problem constraints"
                />
               
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Hints (Optional)
                  </span>
                </label>
                <textarea
                  className="bg-white text-black rounded-[5px] min-h-24 w-full p-3 resize-y"
                  {...register("hints")}
                  placeholder="Enter hints for solving the problem"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Editorial (Optional)
                  </span>
                </label>
                <textarea
                  className="bg-white text-black rounded-[5px] min-h-32 w-full p-3 resize-y"
                  {...register("editorial")}
                  placeholder="Enter problem editorial/solution explanation"
                />
              </div>
            </div>
          </div>

          <div className="card-actions justify-end pt-4 border-t">
            <button type="submit" className="bg-blue-600 text-white rounded-[5px] w-full">
              {isCreating ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                <div className="flex flex-col items-center p-3">
                  <CheckCircle2 className="w-5 h-5" />
                  Create Problem
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProblem;
