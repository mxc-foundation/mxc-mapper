import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ReactMarkdown from "react-markdown";

const Faq = () => {
  const data = useStaticQuery(graphql`
    query {
      allStrapiMapperFaq {
        nodes {
          Answer
          Question
        }
      }
    }
  `);
  const questions = data.allStrapiMapperFaq.nodes;

  console.log(questions);
  return (
    <div className="bg-white">
      <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl leading-9 font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
          MXC MAPPER FAQ
        </h2>

        {questions.map((question) => {
          return (
            <div
              className="mt-6 border-t-2 border-gray-200 pt-6"
              key={question.Question}
            >
              <dl>
                <div className="md:grid md:grid-cols-12 md:gap-8">
                  <dt className="text-base leading-6 font-medium text-black md:col-span-5">
                    {question.Question}
                  </dt>
                  <dd className="mt-2 md:mt-0 md:col-span-7">
                    <p className="text-base leading-6 text-gray-900">
                      <ReactMarkdown source={question.Answer} />
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
