import React, { useState, useEffect, useRef, lazy } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import FeedItem from '../FeedItem/FeedItem';
import { feed } from '../../../api/feed';
import Loading from '../../Loading/Loading';
import NoFeedHome from './NoFeedHome';
import { modalState } from '../../../recoil/modalAtom';
import { Suspense } from 'react';
import { imgState } from '../../../recoil/skeletonAtom';

const Modal = lazy(() => import('../../Modal/Modal/Modal'));

const List = styled.ul`
  background-color: white;
  padding: 57px 20px 70px;
`;

export default function FeedHome() {
  const [modal, setModal] = useRecoilState(modalState);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [myFeed, setMyFeed] = useState([]);
  const [page, setPage] = useState(0);
  const [imgLoading, setImgLoading] = useRecoilState(imgState);
  const observer = useRef();
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const where = sessionStorage.getItem('accountname');

  const getFeed = async (options) => {
    const res = await feed(options);
    setTimeout(() => setImgLoading(false), 500);
    if (options.test === 1) setMyFeed(res.data.posts);
    return res.data.posts;
  };

  const loadFeed = async (options) => {
    setImgLoading(true);
    let Feeds = await getFeed(options);
    setMyFeed((prev) => {
      const prevId = prev.map((v) => v.id);
      const FeedsId = Feeds.map((v) => v.id).filter((v) => !prevId.includes(v));
      Feeds = Feeds.filter((v) => FeedsId.includes(v.id));
      return [...prev, ...Feeds];
    });
    setSkip((prev) => prev + Feeds.length);
    setLoading(false);
  };

  useEffect(() => {
    const onIntersect = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) setPage((p) => p + 1);
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 1 });

    if (observer?.current) {
      io.observe(observer.current);
    }
    return () => io && io.disconnect();
  }, [observer, loading]);

  useEffect(() => {
    loadFeed({ token, limit: 7, skip });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const modalOpen = (type, item) => {
    // window.console.log(name);
    setModal({
      show: true,
      type,
      feedId: item.id,
      accountname: item.author.accountname,
      item: item,
    });
  };

  function moveProfile(accountname) {
    const where = sessionStorage.getItem('accountname');
    if (accountname === where) {
      navigate('/myprofile', {
        state: {
          accountname: accountname,
        },
      });
    } else {
      navigate(`/profile/${accountname}`, {
        state: {
          accountname: accountname,
        },
      });
    }
    setModal((prevModal) => ({ ...prevModal, show: false }));
  }

  function moveDetail(item) {
    navigate('/feeddetail', {
      state: {
        id: item.id,
        infoToIterate: item,
      },
    });
    setModal({ show: false });
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <Loading />
      ) : myFeed.length > 1 ? (
        <main>
          <List>
            {myFeed.map((item) => (
              <li key={item.id}>
                <FeedItem
                  modalOpen={() =>
                    modalOpen(
                      where === item.author.accountname ? 'myFeed' : 'yourFeed',
                      item,
                    )
                  }
                  feedInfo={item}
                  commentCnt={item.commentCount}
                  imgLoading={imgLoading}
                />
              </li>
            ))}
          </List>
          <div ref={observer} />
          {modal.show && (
            <Suspense>
              <Modal
                type={modal.type}
                handlerProfile={() => moveProfile(modal.accountname)}
                handlerFeedDetail={() => moveDetail(modal.item)}
              />
            </Suspense>
          )}
        </main>
      ) : (
        <NoFeedHome />
      )}
    </>
  );
}
